import { Request, Response, NextFunction } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Story from "../../models/Story";
import StoryHistory from "../../models/StoryHistory";

// @desc      getStoryHistory
// @route     GET /api/v1/stories/:storyId/histories
// @access    Auth,Admin,Public

export const getStoryHistory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const storyExist = await Story.findById(req.params.storyId);
    // @ts-ignore
    if (!storyExist || storyExist.author.toString() != req.user._id)
      return next(ErrorResponse(400, "No resource found"));
    const storyHistory = await StoryHistory.findById(req.params.storyId);
    res.send({
      status: "ok",
      storyHistory: storyHistory || [],
    });
  }
);

export default getStoryHistory;
