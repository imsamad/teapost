import { Request, Response, NextFunction } from "express";

import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Profile from "../../models/Profile";
import StoryMeta from "../../models/StoryMeta";
import Story, { StoryDocument } from "../../models/Story";
import { UserDocument } from "../../models/User";

// @desc      Like/Dislike story
// @route     PUT /api/v1/story/like/:storyId
// @route     PUT /api/v1/story/like/undo/:storyId
// @route     PUT /api/v1/story/dislike/:storyId
// @route     PUT /api/v1/story/dislike/undo/:storyId
// @access    Auth [Reader]
const gradeStory = ({ isLike, undo }: { isLike: boolean; undo: boolean }) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const storyId = req.params.storyId as StoryDocument["id"];
    let story = await Story.findById(storyId);

    if (!story) return next(ErrorResponse(400, "Resource not found"));

    // @ts-ignore
    const user: UserDocument["_id"] = req.user._id.toString();

    /*
      like i.e like > 0  then, push likedStories,pull from dislikedStories(in case had been disliked)
      revert i.e. like <=0 then,  pull from likedStories
      
      dislike i.e. dislike > 0 then, push dislikedStories,pull from likedStories(in case had been liked)
      revert dislike => pull from didikeStories    
      */

    const profile = await Profile.findByIdAndUpdate(
      user,
      isLike
        ? undo
          ? { _id: user, $pull: { likedStories: storyId } }
          : {
              _id: user,
              $addToSet: { likedStories: storyId },
              $pull: { dislikedStories: storyId },
            }
        : undo
        ? { _id: user, $pull: { dislikedStories: storyId } }
        : {
            _id: user,
            $addToSet: { dislikedStories: storyId },
            $pull: { likedStories: storyId },
          },
      { upsert: true, new: true }
    );
    const storyMeta = await StoryMeta.findByIdAndUpdate(
      storyId,
      isLike
        ? !undo
          ? {
              _id: storyId,
              $addToSet: { likedBy: user },
              $pull: { dislikedBy: user },
            }
          : { _id: storyId, $pull: { likedBy: user } }
        : !undo
        ? {
            _id: storyId,
            $addToSet: { dislikedBy: user },
            $pull: { likedBy: user },
          }
        : { _id: storyId, $pull: { dislikedBy: user } },

      { upsert: true, new: true }
    );
    res.json({
      status: "ok",
      storyMeta,
    });
  });

export default gradeStory;
