import { NextFunction, Request, Response } from 'express';
import { asyncHandler, typeOf } from '../../lib/utils';
import Primary from '../../models/Comment/Primary';

import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import pagination from '../../lib/pagination';
// @desc      Get comments of story/ Primary comments of specific story
// @route     GET /api/v1/comments/primaries/:storyId
// @access    Public

const getPrimaries = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = Primary.find({
      story: req.params.storyId,
    })
      .populate([
        { path: 'meta' },
        {
          path: 'user',
          select: 'email username',
        },
      ])
      .sort('-createdAt');
    pagination(req, res, { query, label: 'comments' });
  }
);

export const schema = yup.object({
  params: yup.object({
    storyId: yup
      .string()
      .label('storyId')
      .typeError('StoryId must be valid.')
      .required()
      .test('storyId', 'StoryId must be valid.', (val: any) =>
        typeOf(val, 'mongoId')
      ),
  }),
});
export default [validateSchemaMdlwr(schema), getPrimaries];

/*
        {
          path: "secondary",
          populate: [
            { path: "meta" },
            {
              path: "user",
              select: "email username",
            },
            {
              path: "replyToSecondaryUser",
              select: "username email",
            },
          ],
        }
 */
