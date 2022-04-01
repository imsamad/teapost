import { Request, Response, NextFunction } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Story from "../../models/Story";
import StoryHistory from "../../models/StoryHistory";

// @desc      deleteStoryHistoryById
// @route     DELETE /api/v1/storyhistories/:storyId/:historyId
// @route     DELETE /api/v1/storyhistories/:storyId => Delete all
// @access    Auth,Admin

export const deleteStoryHistoryById = ({ isAll = false }) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const storyExist = await Story.findById(req.params.storyId);
    // @ts-ignore
    if (!storyExist || storyExist.author.toString() != req.user._id)
      return next(ErrorResponse(400, "No resource found"));

    if (isAll) {
      await StoryHistory.findByIdAndRemove(req.params.storyId, {
        new: true,
      });
      return res.json({
        status: "ok",
        storyhistory: {},
      });
    }
    const storyHistory = await StoryHistory.findByIdAndUpdate(
      req.params.storyId,
      {
        $pull: { instances: { _id: { $in: [req.params.historyId] } } },
      },
      {
        new: true,
      }
    );

    res.send({
      status: "ok",
      storyHistory: storyHistory || {},
    });
  });

export default deleteStoryHistoryById;
