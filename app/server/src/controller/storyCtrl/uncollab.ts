import { Request, Response, NextFunction } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Profile from "../../models/Profile";
import Story from "../../models/Story";

// @desc      uncollab
// @route     DELETE /api/v1/stories/uncollab/:storyId
// @access    Auth

const uncollab = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    let userId = req.user._id,
      uncollabWith: string[] = req.body.uncollabWith;

    let story = await Story.findById(req.params.storyId);
    const alreadyCollab = story?.collabWith.map((id) => id.toString()) || [];

    uncollabWith = uncollabWith.filter((id) => alreadyCollab.includes(id));

    if (!story || story.author.toString() != userId || !uncollabWith.length) {
      return next(
        ErrorResponse(
          400,
          !uncollabWith.length ? "No change" : "Resource not found"
        )
      );
    }

    story.collabWith.pull(...uncollabWith);

    story = await story.save();

    await Profile.updateMany(
      { _id: { $in: uncollabWith } },
      {
        $pull: { collabStories: story._id },
      }
    );

    res.json({
      status: "ok",
      message: "Operation successed!",
    });
  }
);

export default uncollab;
