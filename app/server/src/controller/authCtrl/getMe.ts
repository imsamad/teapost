import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../../lib/utils";
import Profile from "../../models/Profile";

// @desc      Profile of logged in user.
// @route     GET /api/v1/auth/me
// @access    Auth,Public
const getMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    let query = Profile.findById(user).populate([{ path: "storyCollections" }]);
    // .populate({
    //   path: "storyCollections",
    //   select: "_id ",
    // });
    // .select("storyCollections");
    // ;

    if (req.query.populateStory) query.populate("likedStories dislikedStories");

    const profile = await query;
    // console.log("profile ", profile);
    return res.json({
      status: "ok",
      profile: profile || {
        _id: user,
      },
    });
  }
);
export default getMe;
