import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../lib/utils";
import Primary from "../../models/Comment/Primary";

// @desc      Get comments of story/ Primary comments of specific story
// @route     GET /api/v1/comments/primaries/:storyId
// @access    Public

const getPrimaries = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const page = parseInt(req?.query?.page || 1, 10) || 1,
      // @ts-ignore
      limit = parseInt(req?.query?.limit || 10, 10) || 10;
    // @ts-ignore
    const startIndex = (page - 1) * limit;
    // endIndex = page * limit;
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
      .skip(startIndex)
      .limit(limit)
      .sort("-createdAt")
      .lean();

    let pagination: any = { limit };
    if (comments.length) {
      pagination.next = page + 1;
    }
    if (startIndex > 0) pagination.prev = page - 1;
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
