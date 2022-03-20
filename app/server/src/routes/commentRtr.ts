import express, { Router } from "express";
import {
  getSecondaries,
  getStoryComment,
  likeOrDislike,
  replyToPrimary,
  replyToSecondary,
  updateOrDeleteComment,
} from "../controller/commentCtrl";

import {
  likeOrDislikeSchema,
  replyToSchema,
  reqCommentParams,
  reqPrimaryIdSchema,
  reqStoryParams,
} from "../lib/schema/comment";

import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";

const router: Router = express();

router
  .route("/story/:storyId")
  .get(validateSchema(reqStoryParams), getStoryComment);

router.get(
  "/replyof/:primaryId",
  validateSchema(reqPrimaryIdSchema),
  getSecondaries
);

router.use(protect);

router
  .route("/reply/to/primary/:commentId")
  .post(validateSchema(replyToSchema), replyToPrimary);

router
  .route("/reply/to/secondary/:commentId")
  .post(validateSchema(replyToSchema), replyToSecondary);

router
  .route("/like/undo/:type/:commentId")
  .put(
    validateSchema(likeOrDislikeSchema),
    likeOrDislike({ isLike: true, undo: true })
  );

router
  .route("/dislike/undo/:type/:commentId")
  .put(
    validateSchema(likeOrDislikeSchema),
    likeOrDislike({ isLike: false, undo: true })
  );

router
  .route("/like/:type/:commentId")
  .put(
    validateSchema(likeOrDislikeSchema),
    likeOrDislike({ isLike: true, undo: false })
  );

router
  .route("/dislike/:type/:commentId")
  .put(
    validateSchema(likeOrDislikeSchema),
    likeOrDislike({ isLike: false, undo: false })
  );

router
  .route("/primary/:commentId")
  .put(
    validateSchema(replyToSchema),
    updateOrDeleteComment({ isPrimary: true, isDelete: false })
  )
  .delete(
    validateSchema(reqCommentParams),
    updateOrDeleteComment({ isPrimary: true, isDelete: true })
  );

router
  .route("/secondary/:commentId")
  .put(
    validateSchema(replyToSchema),
    updateOrDeleteComment({ isPrimary: false, isDelete: false })
  )
  .delete(
    validateSchema(reqCommentParams),
    updateOrDeleteComment({ isPrimary: false, isDelete: true })
  );

export default router;
