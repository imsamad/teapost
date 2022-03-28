import express, { NextFunction, Request, Response, Router } from "express";

import {
  commentStory,
  updateStory,
  deleteStory,
  getAllStories,
  gradeStory,
  handleTags,
  publishedStory,
  initializeStory,
  getStoryById,
  getStoryByTag,
  getStoryByAuthor,
} from "../controller/storyCtrl";

import { fetchAuth, protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import {
  commentStorySchema,
  updateStorySchema,
  gradeStorySchema,
  initializeStoryScheme,
  likeOrDislikeSchema,
  publishedStorySchema,
  getStoryByTagSchema,
  getStoryByAuthorSchema,
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

router
  .route("/initialize")
  .post(protect, validateSchema(initializeStoryScheme), initializeStory);

router
  .route("/:storyId")
  .get(fetchAuth, validateSchema(likeOrDislikeSchema), getStoryById)
  .delete(protect, validateSchema(likeOrDislikeSchema), deleteStory)
  .put(protect, validateSchema(updateStorySchema), handleTags, updateStory);

router.route("/").get(filter, getAllStories);

export default router;
