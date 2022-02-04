import { Request, Response, NextFunction } from 'express';

import asyncHandler from '../utils/asyncHandler';
import User from '../models/UserModel';
import emailVerifyMessage from '../utils/sendVerifyEmail';
import ErrorResponse from '../utils/ErrorResponse';
import { decodeJwt, signJwt } from '../utils/jwt';
import { createHash, randomBytes } from '../utils/crypto';
import Token from '../models/TokenModel';

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

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

      if (emailSentResult) {
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

    return res.json({
      status: 200,
      success: true,
      message: `Created your account successfully ,Verify your email sent to ${email}.  `,
      url: !isEmailService && redirectUrl,
    });
  }
);

export const logIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.json('Ok from login');
  }
);

export const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jwtCodedToken: string = req.query.token as string;

    const malliciousReq = ErrorResponse(400, 'Mallicious request.');

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
