import { NextFunction, Request, Response } from 'express';
import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import Primary from '../../models/Comment/Primary';
import Secondary from '../../models/Comment/Secondary';

import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      Reply To Primary Comment
// @route     GET /api/v1/comments/reply/primary/:primaryId
// @access    Auth,Admin,Public

// action => replyToPrimary => create Secondary Comment as response
const replyToPrimary = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const primaryComment = await Primary.findById(req.params.primaryId).lean();
    if (!primaryComment) {
      return next(ErrorResponse(400, 'Resource not found'));
    }
    const comment = await Secondary.create({
      // @ts-ignore
      user: req.user._id,
      text: req.body.text,
      primary: primaryComment._id.toString(),
    });

    res.json({
      status: 'ok',
      comment: await comment.populate([
        {
          path: 'user',
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
      .required(),
  }),
  params: yup.object({
    primaryId: yup
      .string()
      .label('primaryId')
      .typeError('primaryId must be valid.')
      .required()
      .test('primaryId', 'primaryId must be valid.', (val: any) =>
        typeOf(val, 'mongoId')
      ),
  }),
});

export default [validateSchemaMdlwr(schema), replyToPrimary];
