import { Request, Response, NextFunction } from "express";

import { asyncHandler, peelUserDoc } from "../../lib/utils";
import Profile from "../../models/Profile";
import StoryCollection from "../../models/StoryCollection";

// @desc      Profile of logged in user.
// @route     GET /api/v1/auth/me
// @access    Auth
const getMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    let query = Profile.findById(user).populate([{ path: "storyCollections" }]);

    if (req.query.populateStory) query.populate("likedStories dislikedStories");

    const profile = await query;
    const coll = () =>
      StoryCollection.create({
        user,
        title: "Read Later",
      });
    console.log("profile ", profile);
    return res.json({
      status: "ok",
      user: {
        // @ts-ignore
        ...peelUserDoc(req.user),
        profile,
        // : profile || (await coll),
      },
    });
  }
);

export default getMe;
