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

router.use(protect);

router.post("/", validateSchema(createCollectionSchema), createCollection);

router
  .route("/:collectionId")
  .put(validateSchema(updateCollectionSchema), updateCollection)
  .delete(validateSchema(removeCollectionSchema), removeCollection);

export default router;
