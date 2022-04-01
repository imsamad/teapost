import { Request, Response, NextFunction } from "express";

import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Story from "../../models/Story";
import Primary from "../../models/Comment/Primary";

// @desc      Comment on story / Create Primary
// @route     POST /api/v1/comments/primaries/:storyId
// @access    Auth,Admin

const commentOnStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    const storyExist = await Story.findById(req.params.storyId).lean();
    if (!storyExist) {
      return next(ErrorResponse(400, "Resource not found"));
    }
    const primaryComment = (
      await Primary.create({
        user,
        text: req.body.text,
        story: storyExist._id,
      })
    ).populate([
      { path: "meta" },
      {
        path: "user",
        select: "email username",
      },
    ]);
    //   .lean();
    return res.json({
      status: "ok",
      comment: primaryComment,
    });
  }
);

export default commentOnStory;
