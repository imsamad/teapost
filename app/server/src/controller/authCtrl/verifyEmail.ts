import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../../lib/utils";
import User from "../../models/User";
import { ErrorResponse } from "../../lib/utils";

import Profile from "../../models/Profile";
import StoryCollection from "../../models/StoryCollection";
import { retriveToken } from "../../lib/createToken";

const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jwtCodedToken: string = req.params.token as string;

    const malliciousReq = ErrorResponse(400, "Mallicious request.");

    const { token, status } = await retriveToken("verifyemail", jwtCodedToken);

    if (!status) return next(malliciousReq);

    const user = await User.findById(token.userId);

    if (!user) return next(malliciousReq);

    if (token.tempData.newUser) {
      await Profile.create({
        _id: user._id,
        fullName: token.tempData.fullName,
      });
      await StoryCollection.create({ user: user._id, title: "Read Later" });
    } else if (token.tempData.newEmail) user.email = token.tempData.newEmail;

    user.isEmailVerified = true;

    await user.save();

    await token.delete();

    res.status(200).json({
      status: "ok",
      message: "Email verfied successfully.",
    });
  }
);

export default verifyEmail;
