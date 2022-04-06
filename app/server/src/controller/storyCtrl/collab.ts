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
      collabWith: string[] = req.body?.collabWith || [],
      uncollabWith: string[] = req.body?.uncollabWith || [];

    let story = await Story.findById(req.params.storyId);

    const alreadyCollab = story?.collabWith.map((id) => id.toString()) || [];
    collabWith = collabWith.filter((id) => !alreadyCollab.includes(id));
    uncollabWith = uncollabWith.filter((id) => alreadyCollab.includes(id));

    if (
      !story ||
      story?.author?.toString() != userId ||
      (!collabWith.length && !uncollabWith.length)
    ) {
      return next(
        ErrorResponse(
          400,
          !collabWith.length && !uncollabWith.length
            ? "No Change"
            : "Resource not found"
        )
      );
    }

    collabWith.length && story.collabWith.addToSet(...collabWith);
    uncollabWith.length && story.collabWith.pull(...uncollabWith);

    story = await story.save();

    let promises: any = [];
    collabWith.forEach((id) => {
      promises.push(
        Profile.findByIdAndUpdate(
          id,
          {
            _id: id, //@ts-ignore
            $addToSet: { collabStories: story._id },
          },
          {
            upsert: true,
          }
        )
      );
    });
    uncollabWith.forEach((id) => {
      promises.push(
        Profile.findByIdAndUpdate(
          id,
          {
            _id: id,
            //@ts-ignore
            $pull: { collabStories: story._id },
          },
          {
            upsert: true,
          }
        )
      );
    });
    await Promise.allSettled(promises);
    res.json({
      status: "ok",
      message: "Operation successed!",
    });
  }
);

export default collab;
