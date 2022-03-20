import { Request, Response, NextFunction } from "express";

import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Story from "../../models/Story";
import Primary from "../../models/Comment/Primary";

// @desc      Comment on story
// @route     GET /api/v1/stories/comment/:storyId
// @access    Auth,Admin
const commentStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    const storyExist = await Story.findById(req.params.storyId).lean();
    if (!storyExist) {
      return next(ErrorResponse(400, "Resource not found"));
    }
    const primaryComment = await Primary.create({
      user,
      text: req.body.text,
      story: storyExist._id,
    });
    return res.json({
      status: "ok",
      comment: primaryComment,
    });
  }
);

export default commentStory;
