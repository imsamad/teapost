import { Request, Response, NextFunction } from 'express';

import { asyncHandler } from '../lib/utils';
import User, { UserDocument } from '../models/UserModel';
import emailVerifyMessage from '../lib/sendVerifyEmail';
import { ErrorResponse, createHash, randomBytes } from '../lib/utils';
import { decodeJwt, signJwt } from '../lib/jwt';
import Token from '../models/TokenModel';
import { signTokens } from '../lib/signTokens';

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    const alreadyExist = await User.findOne({ email });
    if (alreadyExist)
      next(
        ErrorResponse(400, {
          email: `${email} already registered.`,
        })
      );

    const newUser = new User({
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
          'Unable to process your request please register again.'
        )
      );
    }

    const redirectUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/auth/verifyemail?token=${jwtVerifyToken}`;

    let isEmailService: string | boolean = process.env
      .IS_EMAIL_SERVICE as string;

    isEmailService = isEmailService === 'true';

    if (isEmailService) {
      let emailSentResult = await emailVerifyMessage(email, redirectUrl);
      if (!emailSentResult) {
        await user.delete();
        await token.delete();

        return next(
          ErrorResponse(
            400,
            'Unable to process your request please register again.'
          )
        );
      }
    }

    let resObj: any = {
      status: 200,
      success: true,
      message: `Account created successfully, Verify your email sent to ${email}.`,
    };

    if (!isEmailService) resObj = { ...resObj, redirectUrl };

    return res.json(resObj);
  }
);

export const logIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select('+password');

    if (!user)
      return next(ErrorResponse(400, { email: 'Email not registered.' }));

    const isPwdMatch = await user.matchPassword(password);

    if (!isPwdMatch)
      return next(ErrorResponse(400, { password: 'Password is wrong.' }));

    if (!user.isAuthorised) return next(ErrorResponse(400, 'Not authorised!'));

    user.password = '';

    sendTokens(user, 200, res);
  }
);

export const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jwtCodedToken: string = req.query.token as string;

    const malliciousReq = ErrorResponse(400, 'Mallicious request.');

    if (!jwtCodedToken) return next(malliciousReq);

    const { token: decodedVerifyToken }: any = decodeJwt(jwtCodedToken);

    if (!decodedVerifyToken) return next(malliciousReq);

    const hashedVerifyToken = createHash(decodedVerifyToken);

    let token = await Token.findOne({
      emailVerifyToken: hashedVerifyToken,
    });

    if (!token) return next(malliciousReq);

    const userId: string = token.userId;

    const user = await User.findById(userId);

    if (!user) return next(malliciousReq);

    user.isEmailVerified = true;

    await user.save();
    await token.delete();

    res.status(200).json({
      success: true,
      message: 'Email verfied successfully.',
    });
  }
);

const sendTokens = async (
  user: UserDocument,
  statusCode: number,
  res: Response
) => {
  const { accessToken, refreshToken } = await signTokens(user);

  const resData = {
    success: true,
    data: {
      user: {
        email: user.email,
        accessToken,
        username: user.username,
        role: user.role,
      },
      refreshToken,
    },
  };

  return res.status(statusCode).json(resData);
};
