import { Request, Response, NextFunction } from 'express';

import createToken from '../../lib/createToken';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import User from '../../models/User';
import sendEmail from '../../lib/sendEmail';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';

// @desc      forgotPassword
// @route     GET /api/v1/auth/forgotpassword
// @access    Public

const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { identifier } = req.body;
    let user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
      isEmailVerified: true,
      isAuthorised: true,
    });

    if (!user)
      return next(
        ErrorResponse(400, {
          identifier: "We don't find any matching account.",
        })
      );

    const { redirectUrl, token, message } = await createToken(req, {
      userId: user._id,
      type: 'resetPassword',
    });

    let isEmailService = 'true' === process.env.IS_EMAIL_SERVICE!;

    if (isEmailService) {
      let emailSentResult = await sendEmail(user.email, redirectUrl, message);
      if (!emailSentResult) {
        // @ts-ignore
        token && (await token.delete());
      }
    }

    let resObj: any = {
      status: 'ok',
      message: `Change your password by visiting the link sent to ${user.email} valid for  ${process.env.TOKEN_EXPIRE}.`,
    };

    if (!isEmailService)
      resObj = {
        ...resObj,
        redirectUrl,
        message: `Change your password by visiting this link valid for ${process.env.TOKEN_EXPIRE}.`,
      };

    return res.json(resObj);
  }
);

const schema = yup.object({
  body: yup.object({
    identifier: yup
      .string()
      .typeError('Identfier must be type of string')
      .min(3)
      .label('identifier')
      .required(),
  }),
});
export default [validateSchemaMdlwr(schema), forgotPassword];
