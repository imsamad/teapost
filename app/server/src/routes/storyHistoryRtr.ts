import express, { Router } from "express";

import {
  getStoryHistory,
  getStoryHistoryById,
  deleteStoryHistoryById,
} from "../controller/storyHistoryCtrl";

import { protect } from "../middleware/auth";

import validateSchema from "../middleware/validateSchema";

import { storyHistoryByIdScheme } from "../lib/schema/story";

const router: Router = express();
router.use(protect);

router
  .route("/:storyId/:historyId")
  .get(validateSchema(storyHistoryByIdScheme), getStoryHistoryById)
  .delete(
    validateSchema(storyHistoryByIdScheme),
    deleteStoryHistoryById({ isAll: false })
  );

router
  .route("/:storyId")
  .get(getStoryHistory)
  .delete(deleteStoryHistoryById({ isAll: true }));

export default router;
