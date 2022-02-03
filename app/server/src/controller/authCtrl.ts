import { Request, Response, NextFunction } from 'express';

import asyncHandler from '../utils/asyncHandler';
import User from '../models/UserModel';
import emailVerifyMessage from '../utils/sendVerifyEmail';
import ErrorResponse from '../utils/ErrorResponse';
import { signJwt } from '../utils/jwt';
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
    )}/api/v1/auth/confirmemail?token=${jwtVerifyToken}`;

    const emailSentResult = await emailVerifyMessage(email, redirectUrl);

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

    return res.json({
      status: 200,
      success: true,
      message: `Verify email sent to ${email} `,
      url: redirectUrl,
    });
  }
);

export const signin = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    return res.json('Ok from login');
  }
);
