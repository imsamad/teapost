import { Request, Response, NextFunction } from 'express';

import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import Story from '../../models/Story';
import Primary from '../../models/Comment/Primary';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      Comment on story / Create Primary
// @route     POST /api/v1/comments/primaries/:storyId
// @access    Auth,Admin

const commentOnStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    const storyExist = await Story.findById(req.params.storyId).lean();
    if (!storyExist) {
      return next(ErrorResponse(400, 'Resource not found'));
    }
    const primaryComment = await Primary.create({
      user,
      text: req.body.text,
      story: storyExist._id,
    });
    //   .lean();
    return res.json({
      status: 'ok',
      comment: await primaryComment.populate([
        { path: 'meta' },
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
      .required()
      .trim(),
  }),
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

export default [validateSchemaMdlwr(schema), commentOnStory];
