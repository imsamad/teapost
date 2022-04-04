import express, { Router } from "express";
const router: Router = express();

import {
  addStories,
  createCollection,
  removeCollection,
  updateCollection,
} from "../controller/collectionCtrl";
import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";

import {
  addStoriesSchema,
  createCollectionSchema,
  removeCollectionSchema,
  updateCollectionSchema,
} from "../lib/schema/collection";
import checkTemp from "../middleware/checkTemp";

router.use(protect);

router.post(
  "/",
  checkTemp(),
  validateSchema(createCollectionSchema),
  createCollection
);

router.put(
  "/addstories/:storyId",
  protect,
  validateSchema(addStoriesSchema),
  addStories
);
router
  .route("/:collectionId")
  .put(validateSchema(updateCollectionSchema), updateCollection)
  .delete(validateSchema(removeCollectionSchema), removeCollection);
export default router;
