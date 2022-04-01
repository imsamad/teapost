import express, { Router } from "express";
import {
  getSecondaries,
  getPrimaries,
  createPrimary,
  createSecondary,
  updateOrDeleteComment,
  likeOrDislike,
  replyToSecondary,
} from "../controller/commentCtrl";

import {
  likeOrDislikeSchema,
  replySchema,
  reqSingleParams,
} from "../lib/schema/comment";

import { protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";

const router: Router = express();

router
  .route("/primaries/:storyId")
  .get(validateSchema(reqSingleParams("storyId")), getPrimaries)
  .post(validateSchema(replySchema("storyId")), createPrimary)
  .put(
    validateSchema(replySchema("storyId")),
    updateOrDeleteComment({ isPrimary: true, isDelete: false })
  )
  .delete(
    validateSchema(reqSingleParams("storyId")),
    updateOrDeleteComment({ isPrimary: true, isDelete: true })
  );

router
  .route("/secondaries/:primaryId")
  .get(validateSchema(reqSingleParams("primaryId")), getSecondaries)
  .post(validateSchema(replySchema("primaryId")), createSecondary)
  .put(
    validateSchema(replySchema("primaryId")),
    updateOrDeleteComment({ isPrimary: false, isDelete: false })
  )
  .delete(
    validateSchema(reqSingleParams("primaryId")),
    updateOrDeleteComment({ isPrimary: false, isDelete: true })
  );

router.use(protect);

router.post(
  "/reply/secondary/:commentId",
  validateSchema(replySchema("commentId")),
  replyToSecondary
);

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

export default router;
