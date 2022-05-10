import { Request, Response, NextFunction } from 'express';

import { asyncHandler, ErrorResponse, trimInside } from '../../lib/utils';
import User from '../../models/User';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      forgetEmail
// @route     GET /api/v1/auth/forgotidentifier
// @access    Public
const forgotIdentifier = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { identifierInitials } = req.body;

    let users = await User.find({
      $or: [
        { email: new RegExp(identifierInitials, 'gi') },
        { username: new RegExp(identifierInitials, 'gi') },
      ],
      isEmailVerified: true,
      isAuthorised: true,
    });
    if (!users.length) {
      return next(
        ErrorResponse(400, {
          identifierInitials: `No match found`,
        })
      );
    }

    let matchedIdentifiers: string[] = [];
    users.forEach(({ email, username }) => {
      if (email.match(new RegExp(identifierInitials, 'gi')))
        matchedIdentifiers.push(email);
      if (username.match(new RegExp(identifierInitials, 'gi')))
        matchedIdentifiers.push(username);
    });

    if (!matchedIdentifiers.length) {
      return next(
        ErrorResponse(400, {
          identifierInitials: `No match found`,
        })
      );
    }

    res.json({
      status: 'ok',
      matchedIdentifiers,
    });
  }
);

export const forgotIdentifierSchema = yup.object({
  body: yup.object({
    identifierInitials: yup
      .string()
      .label('identifierInitials')
      .required('identifierInitials is required')
      .test(
        'identifierInitials',
        'identifierInitials must have atleast 3 chars.',
        (val: any) => {
          return trimInside(val, 3);
        }
      ),
  }),
});
export default [validateSchemaMdlwr(forgotIdentifierSchema), forgotIdentifier];
