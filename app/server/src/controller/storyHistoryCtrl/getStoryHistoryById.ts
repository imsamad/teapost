import { Request, Response, NextFunction } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Story from "../../models/Story";
import StoryHistory from "../../models/StoryHistory";

// @desc      getStoryHistoryById
// @route     GET /api/v1/stories/:storyId/histories/:historyId
// @access    Auth,Admin,Public

export const getStoryHistoryById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const storyExist = await Story.findById(req.params.storyId);
    // @ts-ignore
    if (!storyExist || storyExist.author.toString() != req.user._id)
      return next(ErrorResponse(400, "No resource found"));
    let storyHistory = await StoryHistory.findById(req.params.storyId);

    res.send({
      status: "ok",
      storyHistory: storyHistory
        ? storyHistory
            .toJSON()
            .instances.filter(
              (instance) => instance._id == req.params.historyId
            )
        : {},
    });
  }
);

export default getStoryHistoryById;
