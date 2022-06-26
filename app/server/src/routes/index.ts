import express from "express";
import os from "os";
const Router = express.Router();

import authRtr from "./authRtr";
import storyRtr from "./storyRtr";
import collectionRtr from "./collectionRtr";
import userRtr from "./userRtr";
import storyHistoryRtr from "./storyHistoryRtr";
import tagRtr from "./tagRtr";
import commentRtr from "./commentRtr";
import assetRtr from "./assetRtr";
import adminRtr from "./adminRtr";

Router.use("/api/v1/stories", storyRtr);
Router.use("/api/v1/auth", authRtr);
Router.use("/api/v1/collections", collectionRtr);
Router.use("/api/v1/users", userRtr);
Router.use("/api/v1/storyhistories", storyHistoryRtr);
Router.use("/api/v1/tags", tagRtr);
Router.use("/api/v1/comments", commentRtr);
Router.use("/api/v1/assets", assetRtr);
Router.use("/api/v1/admin", adminRtr);

const numOfCpu = os.cpus().length;

Router.use(["/api/v1/health", "/api/v1"], (_req, res) => {
  // cluster.worker?.kill();
  return res.json({
    // dir: __dirname,
    // env: process.env,
    status: "running[||]",
    // env: process.env.NODE_ENV,
    num: numOfCpu,
    message: "I am running & every thing is honkey-dorry.",
  });
});

export default Router;
