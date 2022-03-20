import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../../lib/utils";
import { ErrorResponse } from "../../lib/utils";
import Story from "../../models/Story";
import StoryCollection from "../../models/StoryCollection";

// @desc      Create Collection
// @route     GET /api/v1/auth/collection/add/:storyId
// @access    Auth,Public
const addToCollection = asyncHandler(
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
        // console.log("upRes ", upRes);
      })
      .catch((err: any) => {})
      .finally(() => {
        res.json({ status: "ok" });
      });
  }
);
export default addToCollection;
