import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorResponse } from "../lib/utils";
import CommentMeta from "../models/Comment/CommentMeta";
import Primary from "../models/Comment/Primary";
import Secondary from "../models/Comment/Secondary";

// @desc      Reply To Primary Comment
// @route     GET /api/v1/comments/reply/to/primary/:primaryId
// @access    Auth,Admin,Public

// action => replyToPrimary => create Secondary Comment as response
export const replyToPrimary = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const primaryComment = await Primary.findById(req.params.commentId).lean();
    if (!primaryComment) {
      return next(ErrorResponse(400, "Resource not found"));
    }
    const reply = await Secondary.create({
      // @ts-ignore
      user: req.user._id,
      text: req.body.text,
      replyToPrimary: primaryComment._id,
    });
    res.json({
      status: "ok",
      reply,
    });
  }
);
// @desc      Reply to Secondary Comment
// @route     GET /api/v1/comments/reply/secondary/:commentId
// @access    Auth,Public,Admin
// action => replyToSecondary => create Tertiary Comment as response

export const replyToSecondary = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const secondaryComment = await Secondary.findById(
      req.params.commentId
    ).lean();
    if (!secondaryComment) {
      return next(ErrorResponse(400, "Resource not found"));
    }
    const reply = await Secondary.create({
      // @ts-ignore
      user: req.user._id,
      text: req.body.text,
      replyToSecondaryUser: secondaryComment.user,
      replyToSecondary: secondaryComment._id,
      replyToPrimary: secondaryComment.replyToPrimary,
    });
    res.json({
      status: "ok",
      reply,
    });
  }
);

// @desc      Get comments of story
// @route     GET /api/v1/comments/story/:storyId
// @access    Auth,Public,Admin
export const getStoryComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const comments = await Primary.find({ story: req.params.storyId })
      .populate([
        { path: "meta" },
        {
          path: "user",
          select: "email username",
        },
        {
          path: "secondary",
          populate: [
            { path: "meta" },
            {
              path: "user",
              select: "email username",
            },
            {
              path: "replyToSecondaryUser",
              select: "username email",
            },
          ],
        },
      ])
      .lean();

    res.json({
      staus: "ok",
      comments,
    });
  }
);

// @desc      Get comments of secondary of primary
// @route     GET /api/v1/comments/replyof/:primaryId
// @access    Auth,Public,Admin
export const getSecondaries = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const comments = await Secondary.find({
      replyToPrimary: req.params.primaryId,
    })
      .populate([
        { path: "meta" },
        {
          path: "user",
          select: "email username",
        },
        {
          path: "replyToSecondaryUser",
          select: "username email",
        },
      ])
      .lean();

    res.json({
      staus: "ok",
      comments,
    });
  }
);

// @desc      Update Or Delete Comment
// @route     PUT /api/v1/comment/primary:commentId
// @route     DELETE /api/v1/comment/primary:commentId
// @route     PUT /api/v1/comment/secondary:commentId
// @route     DELETE /api/v1/comment/secondary:commentId
// @access    Auth,Admin

export const updateOrDeleteComment = ({ isPrimary = true, isDelete = false }) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    let comment: any = isPrimary ? Primary : Secondary;
    comment = await comment.findById(req.params.commentId);
    console.log("comment ", comment);
    if (!comment || comment.user.toString() != user)
      return next(ErrorResponse(400, "No resource found"));
    if (isDelete) {
      await comment.remove();
      return res.json({
        status: "ok",
      });
    }
    comment.text = req.body.text;
    comment = await comment.save();
    return res.json({
      status: "ok",
      comment,
    });
  });

// @desc      Like or Dislike

// @route     PUT /api/v1/comments/like/primary/:commentId
// @route     PUT /api/v1/comments/like/secondary/:commentId
// @route     PUT /api/v1/comments/like/undo/primary/:commentId
// @route     PUT /api/v1/comments/like/undo/secondary/:commentId

// @route     PUT /api/v1/comments/dislike/primary/:commentId
// @route     PUT /api/v1/comments/dislike/secondary/:commentId
// @route     PUT /api/v1/comments/dislike/undo/primary/:commentId

// @route     PUT /api/v1/comments/dislike/undo/secondary/:commentId

// @access    Auth,Admin,Public

export const likeOrDislike = ({
  isLike,
  undo,
}: {
  isLike: boolean;
  undo: boolean;
}) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;

    const CommentType = req.params.type == "primary" ? Primary : Secondary;
    let comment = await CommentType.findById(req.params.commentId).lean();

    if (!comment) return next(ErrorResponse(400, "No resource found"));

    const commentId = comment._id;

    const commentMeta = await CommentMeta.findByIdAndUpdate(
      commentId,
      isLike
        ? undo
          ? { _id: commentId, $pull: { likedBy: user } }
          : {
              _id: commentId,
              $addToSet: { likedBy: user },
              $pull: { dislikedBy: user },
            }
        : undo
        ? { _id: commentId, $pull: { dislikedBy: user } }
        : {
            _id: commentId,
            $addToSet: { dislikedBy: user },
            $pull: { likedBy: user },
          },
      {
        upsert: true,
        new: true,
      }
    );

    res.json({
      status: "ok",
      comment: commentMeta,
    });
  });
