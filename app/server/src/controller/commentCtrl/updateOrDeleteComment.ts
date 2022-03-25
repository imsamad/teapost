import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Primary from "../../models/Comment/Primary";
import Secondary from "../../models/Comment/Secondary";

// @desc      Update Or Delete Comment
// @route     PUT /api/v1/comment/primary:commentId
// @route     DELETE /api/v1/comment/primary:commentId
// @route     PUT /api/v1/comment/secondary:commentId
// @route     DELETE /api/v1/comment/secondary:commentId
// @access    Auth,Admin

const updateOrDeleteComment = ({ isPrimary = true, isDelete = false }) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    let comment: any = isPrimary ? Primary : Secondary;
    comment = await comment.findById(req.params.commentId);
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

export default updateOrDeleteComment;
