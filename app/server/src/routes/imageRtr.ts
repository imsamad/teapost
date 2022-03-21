import express, { Router } from "express";
import { imageUpload, getAllImages } from "../controller/imageCtrl";
import validateSchema from "../middleware/validateSchema";
import { imageUploadSchema } from "../lib/schema/imageUpload";
import { protect } from "../middleware/auth";

const router: Router = express();

router.route("/upload").post(
  protect,
  //  validateSchema(imageUploadSchema),
  imageUpload
);

router.route("/").get(protect, getAllImages);

export default router;
