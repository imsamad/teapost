import { Request, Response, NextFunction } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Story from "../../models/Story";
import StoryHistory from "../../models/StoryHistory";

// @desc      deleteStoryHistoryById
// @route     DELETE /api/v1/stories/:storyId/histories/:historyId
// @access    Auth,Admin,Public

export const deleteStoryHistoryById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const storyExist = await Story.findById(req.params.storyId);
    // @ts-ignore
    if (!storyExist || storyExist.author.toString() != req.user._id)
      return next(ErrorResponse(400, "No resource found"));
    const storyHistory = (
      await StoryHistory.findByIdAndUpdate(
        req.params.storyId,
        {
          $pull: { instances: { _id: { $in: [req.params.historyId] } } },
        },
        {
          new: true,
        }
      )
    )
      .toJSON()
      .instances.filter((instance) => instance._id == req.params.historyId);
    res.send({
      status: "ok",
      storyHistory: storyHistory || [],
    });
  }
);

export default deleteStoryHistoryById;
