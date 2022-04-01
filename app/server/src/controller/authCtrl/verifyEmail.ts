import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../../lib/utils";
import User from "../../models/User";
import { ErrorResponse } from "../../lib/utils";
import { retriveToken } from "../../lib/createToken";

// @desc      Verify Email
// @route     GET /api/v1/auth/verifyemail
// @access    Public

const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jwtCodedToken: string = req.params.token as string;

    const malliciousReq = ErrorResponse(400, "Mallicious request.");

    const { token, status } = await retriveToken("verifyemail", jwtCodedToken);

    if (!status) return next(malliciousReq);
    const user = await User.findById(token.userId);

    if (!user) return next(malliciousReq);

    if (token.tempData.isVerifyChangedEmailToken)
      user.email = token.tempData.newEmail;

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
