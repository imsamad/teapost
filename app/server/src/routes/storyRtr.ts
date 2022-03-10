import express, { Router } from "express";

import {
  createOrUpdateStory,
  getAllStories,
  gradeStory,
  handleTags,
  publishedStory,
} from "../controller/storyCtrl";

import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import {
  createStorySchema,
  gradeStorySchema,
  publishedStorySchema,
} from "../schema/story";

const router: Router = express();

router
  .route("/")
  .post(
    protect,
    validateSchema(createStorySchema, true),
    handleTags,
    createOrUpdateStory
  )
  .put(
    protect,
    validateSchema(createStorySchema, true),
    handleTags,
    createOrUpdateStory
  )
  .get(getAllStories);

router
  .route("/published/:storyId")
  .put(protect, validateSchema(publishedStorySchema), publishedStory);

router
  .route("/grade/:storyId")
  .put(protect, validateSchema(gradeStorySchema), gradeStory);

export default router;
