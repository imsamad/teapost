import express, { Router } from "express";
const router: Router = express();

import {
  buildCollecion,
  createCollection,
  getCollectionStories,
  myCollections,
  removeCollection,
  updateCollection,
} from "../controller/collectionCtrl";
import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";

import {
  buildSchema,
  createCollectionSchema,
  removeCollectionSchema,
  updateCollectionSchema,
} from "../lib/schema/collection";

router.use(protect);

router.post("/", validateSchema(createCollectionSchema), createCollection);

router.get("/my", myCollections);

router.get("/stories/:collectionId", getCollectionStories);

router.put("/build", validateSchema(buildSchema), buildCollecion);

router
  .route("/:collectionId")
  .put(validateSchema(updateCollectionSchema), updateCollection)
  .delete(validateSchema(removeCollectionSchema), removeCollection);

export default router;
