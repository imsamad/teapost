import { NextFunction, Request, Response } from 'express';
import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import Primary from '../../models/Comment/Primary';
import Secondary from '../../models/Comment/Secondary';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';

// @desc      Update Or Delete Comment
// @route     PUT /api/v1/comment/primaries/:commentId
// @route     DELETE /api/v1/comment/primaries/:commentId
// @route     PUT /api/v1/comment/secondaries/:commentId
// @route     DELETE /api/v1/comment/secondaries/:commentId
// @access    Auth

const updateOrDeleteComment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isDelete = req.method.toLowerCase() == 'delete';

    const isPrimary = req.path.startsWith('/primaries');
    // @ts-ignore
    const user = req.user._id;

    let comment: any = isPrimary ? Primary : Secondary;

    comment = await comment.findById(req.params.commentId);
    if (!comment || comment.user.toString() != user)
      return next(ErrorResponse(400, 'No resource found'));
    if (isDelete) {
      await comment.remove();
      return res.json({
        status: 'ok',
      });
    }
    comment.text = req.body.text;
    comment = await comment.save();
    return res.json({
      status: 'ok',
      comment,
    });
  }
);

export const schema = yup.object({
  params: yup.object({
    commentId: yup
      .string()
      .label('commentId')
      .typeError('commentId must be valid.')
      .required()
      .test('commentId', 'commentId must be valid.', (val: any) =>
        typeOf(val, 'mongoId')
      ),
  }),
});

export default [validateSchemaMdlwr(schema), updateOrDeleteComment];
