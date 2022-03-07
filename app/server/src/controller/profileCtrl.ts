import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../lib/utils";
import { UserDocument } from "../models/UserModel";
import GradeModel from "../models/GradeModel";

// @desc      Get profile a user
// @route     GET /api/v1/profile/:userId
// @access    Auth,Admin
export const getProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user as UserDocument["id"];
    let query = GradeModel.findOne({ user });

    if (req.query.populateStory) query.populate("likeStories dislikeStories");

    const grade = await query;

    return res.json({
      status: "ok",
      user: user,
      likeStories: grade?.likeStories ?? [],
      dislikeStories: grade?.dislikeStories ?? [],
    });
  }
);
