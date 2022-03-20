import { Request, Response, NextFunction } from "express";

import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Story from "../../models/Story";

// @desc      Delete story
// @route     DELETE /api/v1/story/:storyId
// @access    Auth,Admin

const deleteStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return next(ErrorResponse(400, "Resource not found"));
    }
    await story.remove();
    return res.json({
      status: "deleted",
    });
  }
);

export default deleteStory;
