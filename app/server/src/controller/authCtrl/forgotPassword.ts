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
    const identifier: Partial<{ email: string; username: string }> = {};

    req.body.email && (identifier.email = req.body.email);
    req.body.username && (identifier.username = req.body.username);

    const user = await User.findOne(identifier);
    if (!user) return next(ErrorResponse(400, "No resource found"));

    const { redirectUrl, token, message } = await createToken(
      "resetpassword",
      req,
      user._id,
      { newUser: false }
    );

    let isEmailService: boolean = "true" === process.env.IS_EMAIL_SERVICE!;

    // isEmailService = isEmailService === "true";

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

    if (!isEmailService) resObj = { ...resObj, redirectUrl };

    return res.json(resObj);
  }
);

export default forgotPassword;
