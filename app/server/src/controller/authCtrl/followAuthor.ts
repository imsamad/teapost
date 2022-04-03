import { Request, Response, NextFunction } from "express";

import { asyncHandler, peelUserDoc } from "../../lib/utils";
import Profile from "../../models/Profile";
import User from "../../models/User";

// @desc      Follow author
// @route     GET /api/v1/auth/follow/:authorId
// @access    Auth
const followAuthor = (toFollow: boolean) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //
    // @ts-ignore
    const userId = req.user._id.toString(),
      authorId = req.params.authorId;

    await Profile.findByIdAndUpdate(
      userId,
      toFollow
        ? { $addToSet: { following: authorId } }
        : { $pull: { following: authorId } },
      {
        new: true,
        upsert: true,
      }
    );
    await Profile.findByIdAndUpdate(
      authorId,
      toFollow
        ? { $addToSet: { followers: userId } }
        : { $pull: { followers: userId } },
      {
        new: true,
        upsert: true,
      }
    );

    const user = await User.findByIdAndUpdate(userId, {
      $inc: { following: toFollow ? 1 : -1 },
    });
    await User.findByIdAndUpdate(authorId, {
      $inc: { followers: toFollow ? 1 : -1 },
    });

    return res.json({
      status: "ok", //@ts-ignore
      user: peelUserDoc(user),
    });
  });

export default followAuthor;
