import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../lib/utils";
import Primary from "../../models/Comment/Primary";

// @desc      Get comments of story/ Primary comments of specific story
// @route     GET /api/v1/comments/primaries/:storyId
// @access    Public

const getPrimaries = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const comments = await Primary.find({
      story: { $in: req.params.storyId },
    })
      .populate([
        { path: "meta" },
        {
          path: "user",
          select: "email username",
        },
      ])
      .lean();

    res.json({
      status: "ok",
      comments,
    });
  }
);
export default getPrimaries;

/*
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
        }
 */
