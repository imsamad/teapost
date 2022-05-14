import { NextFunction, Request, Response } from 'express';
import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import Secondary from '../../models/Comment/Secondary';

import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      Reply to Secondary Comment
// @route     GET /api/v1/comments/reply/secondary/:commentId
// @access    Auth,Public,Admin
// action => replyToSecondary => create Tertiary Comment as response

const replyToSecondary = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const secondaryComment = await Secondary.findById(req.params.secondaryId);

    if (!secondaryComment) {
      return next(ErrorResponse(400, 'Resource not found'));
    }
    const comment = await Secondary.create({
      // @ts-ignore
      user: req.user._id,
      text: req.body.text,
      secondaryUser: secondaryComment.user,
      secondary: secondaryComment._id,
      primary: secondaryComment.primary,
    });

    res.json({
      status: 'ok',
      comment: await comment.populate([
        { path: 'meta' },
        {
          path: 'user',
          select: 'email username',
        },
        {
          path: 'secondaryUser',
          select: 'email username',
        },
      ]),
    });
  }
);
export const schema = yup.object({
  body: yup.object({
    text: yup
      .string()
      .label('text')
      .typeError('Text must be string type.')
      .required()
      .trim(),
  }),
  params: yup.object({
    secondaryId: yup
      .string()
      .label('secondaryId')
      .typeError('secondaryId must be valid.')
      .required()
      .test('secondaryId', 'secondaryId must be valid.', (val: any) =>
        typeOf(val, 'mongoId')
      ),
  }),
});
export default [validateSchemaMdlwr(schema), replyToSecondary];
