import { Request, Response, NextFunction } from 'express';

import { asyncHandler, sendTokens } from '../../lib/utils';
import User from '../../models/User';
import { ErrorResponse } from '../../lib/utils';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import { logInSchema } from '../../lib/schema/authSchema';

// @desc      Log in.
// @route     GET /api/v1/auth/login
// @access    Public
const logIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { identifier, password } = req.body;

    let user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
      isEmailVerified: true,
      isAuthorised: true,
    }).select('+password');

    if (!user)
      return next(
        ErrorResponse(400, {
          identifier: 'Identifier not registered/verfied .',
        })
      );

    const isPwdMatch = await user.matchPassword(password);

    if (!isPwdMatch)
      return next(ErrorResponse(400, { password: 'Password is wrong.' }));

    if (!user.isAuthorised) return next(ErrorResponse(400, 'Not authorised!'));

    sendTokens(user, 200, res);
  }
);

export default [validateSchemaMdlwr(logInSchema), logIn];
