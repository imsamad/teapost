import { Request, Response, NextFunction } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Profile from "../../models/Profile";
import Story from "../../models/Story";

// @desc      Collab
// @route     PUT /api/v1/stories/collab/:storyId
// @access    Auth
const collab = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    let userId = req.user._id,
      collabWith: string[] = req.body.collabWith;

    let story = await Story.findById(req.params.storyId);
    const alreadyCollab = story?.collabWith.map((id) => id.toString()) || [];

    collabWith = collabWith.filter((id) => !alreadyCollab.includes(id));

    if (!story || story.author.toString() != userId || !collabWith.length) {
      return next(
        ErrorResponse(
          400,
          !collabWith.length ? "Already collabing" : "Resource not found"
        )
      );
    }

    story.collabWith.addToSet(...collabWith);

    story = await story.save();

    await Profile.updateMany(
      { _id: { $in: collabWith } },
      {
        $addToSet: { collabStories: story._id },
      }
    );

    res.json({
      status: "ok",
      message: "Operation successed!",
    });
  }
);

export default collab;
