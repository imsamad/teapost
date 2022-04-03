import express, { NextFunction, Router, Request, Response } from "express";
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
const swapParams = (req: Request, res: Response, next: NextFunction) => {
  req.params.commentId = req.params.storyId || req.params.primaryId;
  next();
};
router
  .route("/primaries/:storyId")
  .get(validateSchema(reqSingleParams("storyId")), getPrimaries)
  .post(protect, validateSchema(replySchema("storyId")), createPrimary)
  .put(
    protect,
    validateSchema(replySchema("storyId")),
    swapParams,
    updateOrDeleteComment({ isPrimary: true, isDelete: false })
  )
  .delete(
    protect,
    validateSchema(reqSingleParams("storyId")),
    swapParams,
    updateOrDeleteComment({ isPrimary: true, isDelete: true })
  );

router.post(
  "/secondaries/reply/:secondaryId",
  protect,
  validateSchema(replySchema("secondaryId")),
  replyToSecondary
);

router
  .route("/secondaries/:primaryId")
  .get(validateSchema(reqSingleParams("primaryId")), getSecondaries)
  .post(protect, validateSchema(replySchema("primaryId")), createSecondary)
  .put(
    protect,
    validateSchema(replySchema("primaryId")),
    swapParams,
    updateOrDeleteComment({ isPrimary: false, isDelete: false })
  )
  .delete(
    protect,
    validateSchema(reqSingleParams("primaryId")),
    swapParams,
    updateOrDeleteComment({ isPrimary: false, isDelete: true })
  );

router.use(protect);

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
