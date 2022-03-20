import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import CommentMeta from "../../models/Comment/CommentMeta";
import Primary from "../../models/Comment/Primary";
import Secondary from "../../models/Comment/Secondary";

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

const likeOrDislike = ({ isLike, undo }: { isLike: boolean; undo: boolean }) =>
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
export default likeOrDislike;
