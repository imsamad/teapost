import express, { Router } from "express";
import { imageUpload } from "../controller/imageUploadCtrl";
import validateSchema from "../middleware/validateSchema";
import { imageUploadSchema } from "../lib/schema/imageUpload";
import { protect } from "../middleware/auth";
const router: Router = express();

router
  .route("/upload")
  .post(protect, validateSchema(imageUploadSchema), imageUpload);

export default router;
