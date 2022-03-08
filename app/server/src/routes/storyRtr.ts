import express, { Router } from "express";

import {
  changeSlug,
  createOrUpdateStory,
  getAllStories,
  gradeStory,
  handleTags,
  publishedStory,
} from "../controller/storyCtrl";

import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import {
  changeSlugSchema,
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
  .route("/changeslug")
  .put(protect, validateSchema(changeSlugSchema), changeSlug);

router
  .route("/published/:storyId")
  .put(protect, validateSchema(publishedStorySchema), publishedStory);

router
  .route("/like/:storyId")
  .put(protect, validateSchema(gradeStorySchema), gradeStory(true));

router
  .route("/dislike/:storyId")
  .put(protect, validateSchema(gradeStorySchema), gradeStory(false));

export default router;
