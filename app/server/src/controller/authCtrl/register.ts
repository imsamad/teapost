import { NextFunction, Request, Response } from "express";

import { asyncHandler, ErrorResponse } from "../../lib/utils";
import User from "../../models/User";

import sendEmail from "../../lib/sendEmail";
import createToken from "../../lib/createToken";

// @desc      Register new user
// @route     POST /api/v1/story
// @access    Public
const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, fullName } = req.body;

    let alreadyExist = await User.findOne({ email });

    if (alreadyExist)
      next(
        ErrorResponse(400, {
          email: `${email} already registered.`,
        })
      );
    else {
      alreadyExist = await User.findOne({ username });
      if (alreadyExist)
        next(
          ErrorResponse(400, {
            username: `${username} already registered.`,
          })
        );
    }
    const user = await User.create({
      username,
      email,
      password,
    });

    const { token, redirectUrl, message } = await createToken(
      "verifyemail",
      req,
      user._id,
      { fullName, newUser: true }
    );
    const tryAgain = ErrorResponse(
      400,
      "Unable to process your request please register again."
    );

    if (!token || !redirectUrl) {
      await user.delete();
      return next(tryAgain);
    }

    let isEmailService: boolean = "true" === process.env.IS_EMAIL_SERVICE!;

    // isEmailService = isEmailService === "true";

    if (isEmailService) {
      let emailSentResult = await sendEmail(email, redirectUrl, message);
      if (!emailSentResult) {
        await user.delete();
        await token.delete();

        return next(tryAgain);
      }
    }
    let resObj: any = {
      status: "ok",
      message: `Account created successfully, Verify your email sent to ${email}.`,
    };

    if (!isEmailService) resObj = { ...resObj, redirectUrl };

    return res.json(resObj);
  }
);
export default register;
