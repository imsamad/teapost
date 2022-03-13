import express, { Router } from "express";
const router: Router = express();

import {
  createCollection,
  removeCollection,
  updateCollection,
} from "../controller/collectionCtrl";
import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";

import {
  createCollectionSchema,
  removeCollectionSchema,
  updateCollectionSchema,
} from "../lib/schema/collection";

router.post(
  "/",
  protect,
  validateSchema(createCollectionSchema),
  createCollection
);

router
  .route("/:collectionId")
  .put(protect, validateSchema(updateCollectionSchema), updateCollection)
  .delete(protect, validateSchema(removeCollectionSchema), removeCollection);

export default router;
