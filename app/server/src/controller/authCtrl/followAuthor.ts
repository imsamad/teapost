import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../../lib/utils";
import { ErrorResponse } from "../../lib/utils";
import Profile from "../../models/Profile";

// @desc      Follow author
// @route     GET /api/v1/auth/follow/:authorId
// @access    Auth
const followAuthor = (toDoFollow: boolean) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let author = await Profile.findById(req.params.authorId);
    // @ts-ignore
    const userId = req.user._id.toString();
    if (!author || author._id.toString() == userId) {
      return next(ErrorResponse(400, "No resouce found"));
    }
    const user = await Profile.findByIdAndUpdate(
      userId,
      toDoFollow
        ? { $addToSet: { following: author._id } }
        : { $pull: { following: author._id } },
      {
        new: true,
        upsert: true,
      }
    );
    author = await author.update(
      toDoFollow
        ? { $addToSet: { followers: user._id } }
        : { $pull: { followers: user._id } }
    );
    return res.json({
      status: "ok",
      profile: user,
    });
  });
export default followAuthor;
