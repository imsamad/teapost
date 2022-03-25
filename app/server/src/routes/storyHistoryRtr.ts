import express, { Router } from "express";

import {
  getStoryHistory,
  getStoryHistoryById,
  deleteStoryHistoryById,
} from "../controller/storyHistoryCtrl";

import { protect } from "../middleware/auth";

import validateSchema from "../middleware/validateSchema";

import {
  likeOrDislikeSchema,
  storyHistoryByIdScheme,
} from "../lib/schema/story";

const router: Router = express();

router
  .route("/:storyId/:historyId")
  .get(protect, validateSchema(storyHistoryByIdScheme), getStoryHistoryById)
  .delete(
    protect,
    validateSchema(storyHistoryByIdScheme),
    deleteStoryHistoryById({ isAll: false })
  );

router
  .route("/:storyId")
  .get(protect, validateSchema(likeOrDislikeSchema), getStoryHistory)
  .delete(
    protect,
    validateSchema(likeOrDislikeSchema),
    deleteStoryHistoryById({ isAll: true })
  );

export default router;
