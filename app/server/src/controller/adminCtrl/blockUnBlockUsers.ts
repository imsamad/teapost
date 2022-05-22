import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import { isValidObjectId } from 'mongoose';
import User from '../../models/User';

const blockUnBlockUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isBlock = req.originalUrl.split('/').pop()?.startsWith('block');

    // @ts-ignore
    const admin = req.user._id.toString();

    if (isBlock && req.body.userIds.includes(admin) && !req.body.blockMySelf) {
      return next(
        ErrorResponse(
          400,
          `If you want to block yourself to then set blockMySelf field in body header as true and mention your unique userId in userIds array.`
        )
      );
    }

    // if (req.body.blockMySelf) req.body.userIds.push(admin);

    const users = await User.updateMany(
      { _id: { $in: req.body.userIds } },
      { isAuthorised: isBlock ? false : true }
    );

    return res.status(200).json({
      success: 200,
      message: 'Users have been blocked',
    });
  }
);

const schema = yup.object({
  body: yup.object({
    userIds: yup
      .array()
      .label('userIds')
      .required()
      .typeError('userIds must be array of userId')
      .of(
        yup
          .string()
          .label('userIds')
          .test('userIds', 'Provide valid userIds', isValidObjectId)
      )
      .min(1),
    blockMySelf: yup.boolean().nullable(),
  }),
});

export default [validateSchemaMdlwr(schema), blockUnBlockUsers];
