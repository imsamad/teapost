import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../lib/utils";
import UserModel, { UserDocument } from "../models/UserModel";
import emailVerifyMessage from "../lib/sendVerifyEmail";
import { ErrorResponse, createHash, randomBytes } from "../lib/utils";
import { decodeJwt, signJwt } from "../lib/jwt";
import Token from "../models/TokenModel";
import ProfileModel from "../models/ProfileModel";

// @desc      Register new user
// @route     POST /api/v1/story
// @access    Public
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    const alreadyExist = await UserModel.findOne({ email });
    if (alreadyExist)
      next(
        ErrorResponse(400, {
          email: `${email} already registered.`,
        })
      );

    const newUser = new UserModel({
      username,
      email,
      password,
    });

    const user = await newUser.save();

    const verifyToken = randomBytes(20);

    const hashedVerifyToken = createHash(verifyToken);

    const jwtVerifyToken = signJwt({ token: verifyToken });

    const token = await Token.create({
      emailVerifyToken: hashedVerifyToken,
      userId: user.id || user._id,
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

    let isEmailService: string | boolean = process.env
      .IS_EMAIL_SERVICE as string;

    isEmailService = isEmailService === "true";

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

    await ProfileModel.create({ _id: user._id });
    let resObj: any = {
      status: "ok",
      message: `Account created successfully, Verify your email sent to ${email}.`,
    };

    if (!isEmailService) resObj = { ...resObj, redirectUrl };

    return res.json(resObj);
  }
);

export const logIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email }).select("+password");

    if (!user)
      return next(ErrorResponse(400, { email: "Email not registered." }));

    const isPwdMatch = await user.matchPassword(password);

    if (!isPwdMatch)
      return next(ErrorResponse(400, { password: "Password is wrong." }));

    if (!user.isAuthorised) return next(ErrorResponse(400, "Not authorised!"));

    user.password = "";
    // delete user?.password;

    sendTokens(user, 200, res);
  }
);

export const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jwtCodedToken: string = req.query.token as string;

    const malliciousReq = ErrorResponse(400, "Mallicious request.");

    if (!jwtCodedToken) return next(malliciousReq);

    const { token: decodedVerifyToken }: any = decodeJwt(jwtCodedToken);

    if (!decodedVerifyToken) return next(malliciousReq);

    const hashedVerifyToken = createHash(decodedVerifyToken);

    let token = await Token.findOne({
      emailVerifyToken: hashedVerifyToken,
    });

    if (!token) return next(malliciousReq);

    const userId: string = token.userId;

    const user = await UserModel.findById(userId);

    if (!user) return next(malliciousReq);

    user.isEmailVerified = true;

    await user.save();
    await token.delete();

    res.status(200).json({
      status: "ok",
      message: "Email verfied successfully.",
    });
  }
);

const sendTokens = async (
  user: UserDocument,
  statusCode: number,
  res: Response
) => {
  const resData = {
    status: "ok",
    user: {
      id: user._id || user.id,
      email: user.email,
      accessToken: signJwt(
        { user: user._id },
        {
          expiresIn: "7d",
        }
      ),
      username: user.username,
      role: user.role,
    },
  };

  return res.status(statusCode).json(resData);
};

// @desc      Profile of logged in user.
// @route     GET /api/v1/auth/me
// @access    Auth,Public
export const getMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    let query = ProfileModel.findById(user).lean();

    if (req.query.populateStory) query.populate("likedStories dislikedStories");

    const profile = await query;
    return res.json({
      status: "ok",
      profile: profile?._id
        ? profile
        : {
            _id: profile?._id || profile?.id,
            likedStories: profile?.likedStories,
            dislikedStories: profile?.dislikedStories,
          },
    });
  }
);

// @desc      Follow author
// @route     GET /api/v1/auth/follow/:authorId
// @access    Auth
export const followAuthor = (toDoFollow: boolean) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let author = await ProfileModel.findById(req.params.authorId);
    // @ts-ignore
    const userId = req.user._id.toString();
    if (!author || author._id.toString() == userId) {
      return next(ErrorResponse(400, "No resouce found"));
    }
    const user = await ProfileModel.findByIdAndUpdate(
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
