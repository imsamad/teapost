import path from "path";
import * as dotenv from "dotenv";
dotenv.config({
  path: path.join(__dirname, "../", `config`, ".env"),
});
import express from "express";
import cors from "cors";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";

import connectDB from "./db/connectDB";

import errorHandler from "./middleware/errorHandler";
import notFound from "./middleware/notFound";

import authRtr from "./routes/authRtr";
import storyRtr from "./routes/storyRtr";
import tagRtr from "./routes/tagRtr";
import imageUploadRtr from "./routes/imageUploadRtr";
import profileRtr from "./routes/profileRtr";
import collectionRtr from "./routes/collectionRtr";
import checkTemp from "./middleware/checkTemp";

const app = express();
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(cors());
// app.use(limiter);
app.use(express.json());
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

// app.use(checkTemp());

app.use("/api/v1/auth", authRtr);
app.use("/api/v1/stories", storyRtr);
app.use("/api/v1/tags", tagRtr);
app.use("/api/v1/image", imageUploadRtr);
app.use("/api/v1/profile", profileRtr);
app.use("/api/v1/collection", collectionRtr);

app.get("/api/v1", (_req, res) => {
  console.log("req.query ", _req.query);
  res.json({
    dir: __dirname,
    env: process.env,
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  connectDB();

  console.log(`Listening on http://localhost:${PORT}`);
});
