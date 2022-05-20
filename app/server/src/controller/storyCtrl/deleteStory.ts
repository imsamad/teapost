import { Request, Response, NextFunction } from 'express';

import { array, object, string } from 'yup';

import { isValidObjectId } from 'mongoose';
import validateSchema from '../../middleware/validateSchemaMdlwr';
import { asyncHandler, ErrorResponse, typeOf } from '../../lib/utils';
import Story from '../../models/Story';

// @desc      Delete story
// @route     DELETE /api/v1/story/:storyId
// @access    Auth,Admin

const ctrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const storyIds =
      req.params.storyId == 'multiple'
        ? req.body?.storyIds
        : [req.params.storyId];

    if (!storyIds?.length) return next(ErrorResponse(400, 'Provide storyIds'));
    //  @ts-ignore
    const author = req.user._id.toString();
    const stories = await Story.find({ _id: { $in: storyIds }, author }).select(
      '-content'
    );

    if (!stories.length) {
      return next(ErrorResponse(400, 'Resource not found'));
    }
    const storiesDeleted = await Promise.allSettled(
      stories.map((story) => story.remove())
    );

    return res.json({
      stories: storiesDeleted
        .filter((resolve) => resolve.status == 'fulfilled')
        // @ts-ignore
        .map((resolve) => resolve.value),
    });
  }
);

const schema = object({
  params: object({
    storyId: string()
      .label('storyId')
      .typeError('StoryId must be string type.')
      .test('storyId', 'Story Id must be a valid', (val) =>
        val == 'multiple' ? true : isValidObjectId(val)
      ),
  }),
  body: object({
    storyIds: array()
      .label('storyIds')
      .typeError('To delete multiple proide array of storyIds')
      .test(
        'storyId',
        'To delete multiple proide array of storyIds',
        (val: any) =>
          !val ? true : typeOf(val, 'array') && val.every(isValidObjectId)
      ),
  }),
})
  .label('body')
  .test('body', 'Provide proper story id', (val: any) => {
    if (val.params.storyId == 'multiple')
      return val.body.storyIds && typeOf(val.body.storyIds, 'array');

    return true;
  });

export default [validateSchema(schema), ctrl];
