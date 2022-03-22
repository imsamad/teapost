import { NextFunction, Request, Response } from "express";
import { signJwt } from "../../lib/jwt";
import {
  asyncHandler,
  createHash,
  ErrorResponse,
  randomBytes,
} from "../../lib/utils";
import Profile from "../../models/Profile";
import StoryCollection from "../../models/StoryCollection";
import Token from "../../models/Token";
import User from "../../models/User";

import emailVerifyMessage from "../../lib/sendVerifyEmail";

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

    const verifyToken = randomBytes(20);

    const hashedVerifyToken = createHash(verifyToken);

    const jwtVerifyToken = signJwt(
      { token: verifyToken },
      {},
      process.env.JWT_TOKEN_SECRET!
    );
    // jwt of hashed of randomBytes
    const token = await Token.create({
      emailVerifyToken: hashedVerifyToken,
      userId: user._id,
    });

    if (!token || !verifyToken || !hashedVerifyToken || !jwtVerifyToken) {
      await user.delete();
      if (token) await token.delete();
      return next(
        ErrorResponse(
          400,
          "Unable to process your request please register again."
        )
      );
    }

    const redirectUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/verifyemail?token=${jwtVerifyToken}`;

    let isEmailService: boolean = "true" === process.env.IS_EMAIL_SERVICE!;

    // isEmailService = isEmailService === "true";

    if (isEmailService) {
      let emailSentResult = await emailVerifyMessage(email, redirectUrl);
      if (!emailSentResult) {
        await user.delete();
        await token.delete();

        return next(
          ErrorResponse(
            400,
            "Unable to process your request please register again."
          )
        );
      }
    }

    await Profile.create({ _id: user._id, fullName });
    await StoryCollection.create({ user: user._id, title: "Read Later" });
    let resObj: any = {
      status: "ok",
      message: `Account created successfully, Verify your email sent to ${email}.`,
    };

    if (!isEmailService) resObj = { ...resObj, redirectUrl };

    return res.json(resObj);
  }
);
export default register;
