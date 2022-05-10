import { NextFunction, Request, Response } from 'express';
import { asyncHandler, ErrorResponse } from '../../lib/utils';

import User from '../../models/User';
import sendEmail from '../../lib/sendEmail';
import createToken from '../../lib/createToken';
import { registerSchema } from '../../lib/schema/authSchema';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';

// @desc      Create new user
// @route     POST /api/v1/auth/register
// @access    Public
const ctrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, fullName } = req.body;

    // If email || username already register
    let alreadyExistUsernameOrEmail = await User.findOne({ email });
    if (alreadyExistUsernameOrEmail) {
      return next(
        ErrorResponse(400, {
          email: `${email} already registered.`,
        })
      );
    } else {
      alreadyExistUsernameOrEmail = await User.findOne({ username });
      if (alreadyExistUsernameOrEmail)
        return next(
          ErrorResponse(400, {
            username: `${username} already registered.`,
          })
        );
    }

    const newUser = await User.create({
      username,
      email,
      password,
      fullName,
    });
    const tryAgain = ErrorResponse(
      400,
      'Unable to process your request please register again.'
    );

    try {
      const { token, redirectUrl, message } = await createToken(req, {
        type: 'verifyRegistration',
        userId: newUser._id,
        newEmail: email,
      });

      let isEmailService: boolean = 'true' === process.env.IS_EMAIL_SERVICE!;

      if (isEmailService) {
        let emailSentResult = await sendEmail(email, redirectUrl, message);
        if (!emailSentResult) {
          await newUser.delete();
          // @ts-ignore
          await token.delete();
          return next(tryAgain);
        }
      }

      let resObj: any = {
        status: 'ok',
        message: `Account created successfully, Verify your email sent to ${email} valid for  ${process.env.TOKEN_EXPIRE}.`,
      };

      if (!isEmailService)
        resObj = {
          ...resObj,
          redirectUrl,
          message: `Account created successfully, Verify your by visting link valid for  ${process.env.TOKEN_EXPIRE}.`,
        };

      return res.json(resObj);
    } catch (err) {
      newUser && (await newUser.delete());
      return next(tryAgain);
    }
  }
);

export default [validateSchemaMdlwr(registerSchema), ctrl];
