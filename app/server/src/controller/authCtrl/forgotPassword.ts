import { Request, Response, NextFunction } from "express";

import createToken from "../../lib/createToken";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import User from "../../models/User";
import sendEmail from "../../lib/sendEmail";

// @desc      forgotPassword
// @route     POST /api/v1/auth/forgotpassword
// @access    Public

const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { identifier } = req.body;
    const filter =
      process.env.ONLY_VERIFIED_ALLOWED == "true"
        ? {
            isEmailVerified: true,
            isAuthorised: true,
          }
        : {};

    let user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
      ...filter,
    });

    if (!user)
      return next(
        ErrorResponse(400, {
          identifier: "Identifier not associated with any acccount.",
        })
      );

    const { redirectUrl, token, message } = await createToken(
      "resetpassword",
      req,
      user._id,
      { isVerifyChangedEmailToken: false }
    );

    let isEmailService = "true" === process.env.IS_EMAIL_SERVICE!;

    if (isEmailService) {
      let emailSentResult = await sendEmail(user.email, redirectUrl, message);
      if (!emailSentResult) {
        await token.delete();
      }
    }
    let resObj: any = {
      status: "ok",
      message: `Chnage your password by visiting the link sent to ${user.email}.`,
    };

    if (!isEmailService)
      resObj = {
        ...resObj,
        redirectUrl,
        message: `Chnage your password by visiting this link valid for 10min.`,
      };

    return res.json(resObj);
  }
);

export default forgotPassword;
