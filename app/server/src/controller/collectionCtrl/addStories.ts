import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../../lib/utils";
import { ErrorResponse } from "../../lib/utils";
import Story from "../../models/Story";
import StoryCollection from "../../models/StoryCollection";

// @desc      addStories
// @route     PUT /api/v1/collection/addstories/:storyId
// @access    Auth

const addStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    const story = await Story.findById(req.params.storyId);
    if (!story) return next(ErrorResponse(400, "No resource found"));

    const { addToDefault, removeFromDefault, addTo, removeFrom } = req.body;

    let updatePromise: any = [];
    if (addToDefault || removeFromDefault) {
      updatePromise.push(
        StoryCollection.findOneAndUpdate(
          {
            user,
            title: new RegExp("^" + "read later" + "$", "i"),
          },
          addToDefault
            ? { user, $addToSet: { stories: story._id } }
            : { user, $pull: { stories: story._id } },
          {
            new: true,
            upsert: true,
          }
        )
      );
    }
    if (addTo) {
      addTo.forEach((collId: string) => {
        updatePromise.push(
          StoryCollection.findOneAndUpdate(
            { _id: collId, user },
            { _id: collId, user, $push: { stories: story._id } },
            { new: true, upsert: true }
          )
        );
      });
    }
    if (removeFrom) {
      removeFrom.forEach((collId: string) => {
        updatePromise.push(
          StoryCollection.findOneAndUpdate(
            { _id: collId, user },
            {
              _id: collId,
              user,
              $pull: { stories: story._id },
            },
            { new: true, upsert: true }
          )
        );
      });
    }

    Promise.allSettled(updatePromise)
      .then((upRes) => {
        console.log("upResupRes ", upRes);
        //   Send back all collections
      })
      .catch((err: any) => {})
      .finally(() => {
        res.json({ status: "ok" });
      });
  }
);
export default addStories;
