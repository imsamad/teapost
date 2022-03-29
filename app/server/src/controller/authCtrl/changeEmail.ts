import { Request, Response, NextFunction } from "express";
import createToken from "../../lib/createToken";
import sendEmail from "../../lib/sendEmail";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import User from "../../models/User";

// @desc      Change Email
// @route     PUT /api/v1/auth/changeemail
// @access    Auth

const changeEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { newEmail } = req.body,
      // @ts-ignore
      user = req.user;

    let alreadyExist = await User.findOne({ email: newEmail });
    if (alreadyExist)
      next(
        ErrorResponse(400, {
          newEmail: `${newEmail} already registered.`,
        })
      );

    const { redirectUrl, message, token } = await createToken(
      "verifyemail",
      req,
      user._id,
      {
        newEmail,
        newUser: false,
      }
    );

    let isEmailService: boolean = "true" === process.env.IS_EMAIL_SERVICE!;

    if (isEmailService) {
      let emailSentResult = await sendEmail(user.email, redirectUrl, message);
      if (!emailSentResult) {
        await token.delete();
      }
    }

    let resObj: any = {
      status: "ok",
      message: `Verify your email by visiting the link sent to ${user.email}.`,
    };

    if (!isEmailService) resObj = { ...resObj, redirectUrl };

    return res.json(resObj);
  }
);

export default changeEmail;
