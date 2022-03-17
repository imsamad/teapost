import express, { NextFunction, Request, Response, Router } from "express";

import {
  commentStory,
  createOrUpdateStory,
  deleteStory,
  getAllStories,
  gradeStory,
  handleTags,
  publishedStory,
} from "../controller/storyCtrl";

import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import {
  commentStorySchema,
  createStorySchema,
  gradeStorySchema,
  likeOrDislikeSchema,
  publishedStorySchema,
} from "../lib/schema/story";
import { filter } from "../middleware/getStoriesFilter";

const router: Router = express();

router
  .route("/published/:storyId")
  .put(protect, validateSchema(publishedStorySchema), publishedStory);
router
  .route("/grade/:storyId")
  .put(
    protect,
    validateSchema(gradeStorySchema),
    (req: Request, res: Response, next: NextFunction) => {
      const isLike = typeof req.body.like !== "undefined" ? true : false;
      const gradeCount = isLike
        ? parseInt(req.body.like)
        : parseInt(req.body.dislike);
      return gradeStory({ isLike, undo: gradeCount > 0 ? false : true })(
        req,
        res,
        next
      );
    }
  );

router
  .route("/like/undo/:storyId")
  .put(
    protect,
    validateSchema(likeOrDislikeSchema),
    gradeStory({ isLike: true, undo: true })
  );

router
  .route("/dislike/:storyId")
  .put(
    protect,
    validateSchema(likeOrDislikeSchema),
    gradeStory({ isLike: false, undo: false })
  );

router
  .route("/like/:storyId")
  .put(
    protect,
    validateSchema(likeOrDislikeSchema),
    gradeStory({ isLike: true, undo: false })
  );

router
  .route("/dislike/undo/:storyId")
  .put(
    protect,
    validateSchema(likeOrDislikeSchema),
    gradeStory({ isLike: false, undo: true })
  );
router
  .route("/comment/:storyId")
  .put(protect, validateSchema(commentStorySchema), commentStory);

router.route("/:storyId").delete(deleteStory);

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
  .get(filter, getAllStories);
export default router;
