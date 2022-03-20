import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../lib/utils";
import Primary from "../../models/Comment/Primary";

// @desc      Get comments of story
// @route     GET /api/v1/comments/story/:storyId
// @access    Auth,Public,Admin
const getStoryComment = asyncHandler(
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
export default getStoryComment;
