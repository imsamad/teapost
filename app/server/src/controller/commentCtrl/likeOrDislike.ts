import { NextFunction, Request, Response } from 'express';

import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import CommentMeta from '../../models/Comment/CommentMeta';
import Primary from '../../models/Comment/Primary';
import Secondary from '../../models/Comment/Secondary';

import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      Like or Dislike

// @route     PUT /api/v1/comments/like/primary/:commentId
// @route     PUT /api/v1/comments/like/secondary/:commentId
// @route     PUT /api/v1/comments/like/undo/primary/:commentId
// @route     PUT /api/v1/comments/like/undo/secondary/:commentId

// @route     PUT /api/v1/comments/dislike/primary/:commentId
// @route     PUT /api/v1/comments/dislike/secondary/:commentId
// @route     PUT /api/v1/comments/dislike/undo/primary/:commentId
// @route     PUT /api/v1/comments/dislike/undo/secondary/:commentId

// @access    Auth

const likeOrDislike = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isLike = req.body.isLike ?? !req.body.isDislike,
      undo = req.body.undo;

    // @ts-ignore
    const user = req.user._id;
    const isPrimary = req.path.endsWith('/primary');
    const CommentType: any = isPrimary ? Primary : Secondary;
    let comment = await CommentType.findById(req.params.commentId);

    if (!comment) return next(ErrorResponse(400, 'No resource found'));

    const commentId = comment._id;

    const commentMeta = await CommentMeta.findByIdAndUpdate(
      commentId,
      isLike
        ? undo
          ? { _id: commentId, $pull: { likedBy: user } }
          : {
              _id: commentId,
              $addToSet: { likedBy: user },
              $pull: { dislikedBy: user },
            }
        : undo
        ? { _id: commentId, $pull: { dislikedBy: user } }
        : {
            _id: commentId,
            $addToSet: { dislikedBy: user },
            $pull: { likedBy: user },
          },
      {
        upsert: true,
        new: true,
      }
    );

    comment.noOfLikes = commentMeta.likedBy.length;

    comment.noOfDislikes = commentMeta.dislikedBy.length;
    comment.updatedAt = comment.createdAt;
    await comment.save();
    res.json({
      status: 'ok',
      comment: await comment.save(),
    });
  }
);

export const schema = yup.object({
  body: yup
    .object()
    .shape(
      {
        isLike: yup
          .boolean()
          .label('isLike')
          .typeError('Express isLike in true/false')
          .when('isDislike', {
            is: (dislike: any) => typeof dislike === 'undefined',
            then: yup.boolean().required('Like or dislike is required'),
          }),
        isDislike: yup
          .boolean()
          .label('isDislike')
          .typeError('Express isDislike in true/false')
          .when('isLike', {
            is: (like: any) => typeof like === 'undefined',
            then: yup.boolean().required('Like or dislike is required'),
          }),
        undo: yup
          .boolean()
          .label('undo')
          .typeError('Express undo in booleans value'),
      },
      [['isLike', 'isDislike']]
    )
    .label('body')
    .test('body', 'Provide appropriate data', (val: any) => {
      return typeOf(val.isDislike, 'boolean') || typeOf(val.isLike, 'boolean')
        ? true
        : false;
    }),
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

export default [validateSchemaMdlwr(schema), likeOrDislike];
