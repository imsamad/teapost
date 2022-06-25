import "colors";
import path from "path";

import * as dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, "../", `config`, ".env"),
});
import connectDB from "./db/connectDB";

import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";

// Security middlewares
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
// @ts-ignore
import xss from "xss-clean";
import hpp from "hpp";

import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";

import BUSINESS_ROUTES from "./routes";

import os from "os";
import cluster from "cluster";

const app = express();
app.use(mongoSanitize());

app.use(helmet());

app.use(xss());
app.use(hpp());
app.use(cors());
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
// app.use(limiter);

app.use(express.json());
app.use(express.text());
app.use(morgan("dev"));
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../", "tmp"),
  })
);

app.use(
  "/image",
  express.static(path.join(__dirname, "../", "/public/uploads/image"))
);

app.use(express.static(path.join(__dirname, "../", "public")));

app.use(BUSINESS_ROUTES);

const numOfCpu = os.cpus().length;
const noOfCluster = numOfCpu == 1 ? 4 : numOfCpu;

app.get(["/api/v1", "/api/v1/health"], (_req, res) => {
  // cluster.worker?.kill();
  return res.json({
    // dir: __dirname,
    // env: process.env,
    status: "running",
    // env: process.env.NODE_ENV,
    num: numOfCpu,
    message: "I am running & every thing is honkey-dorry.",
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

const clusterise = () => {
  // Kickstart app
  if (cluster.isPrimary) for (let i = 0; i < noOfCluster; i++) cluster.fork();
  else
    connectDB()
      .then(() => {
        app.listen(PORT);
      })
      .catch(() => {});

  cluster
    .on("fork", function (worker) {
      console.log(
        `):- New Instance with no ${worker.id} with pid ${worker.process.pid} forked.`
          .blue.bold
      );
    })
    .on("exit", function (worker) {
      console.log(
        `):- Instance with id ${worker.process.pid} died.`.red.underline.bold
      );
      cluster.fork();
    })
    .on("listening", function (worker, { port, address }) {
      console.log(
        `):- Instance of wid -> ${worker.id} & pid -> ${worker.process.pid} listening on http://localhost:${PORT}`
          .yellow.bold
      );
    });
};
const runApp = () => {
  connectDB()
    .then(() => {
      app.listen(PORT, async () => {
        // const resMongo = await connectDB();
        // console.log({ resMongo });
        console.log(
          `):- App Instance with pid ${process.pid} Listening on http://localhost:${PORT}`
            .yellow.bold
        );
      });
    })
    .catch(() => {});
};
clusterise();
// runApp();
