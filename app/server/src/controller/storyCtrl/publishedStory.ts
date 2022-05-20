import { Request, Response, NextFunction } from 'express';

import {
  asyncHandler,
  ErrorResponse,
  validateYupSchema,
} from '../../lib/utils';
import Story from '../../models/Story';
import { isAbleToPublished } from '../../lib/schema/storySchema';
import validateSchema from '../../middleware/validateSchemaMdlwr';
import { object, string } from 'yup';
import { isValidObjectId } from 'mongoose';

// @desc      Published story story
// @route     PUT /api/v1/story/published/:storyId
// @access    Auth [Reader]
const ctrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isPublish =
      req.originalUrl.split('/').slice(-2, -1).pop()?.toLowerCase() ==
      'published';

    let story = await Story.findById(req.params.storyId)
      .select('+hadEmailedToFollowers')
      .select(isPublish ? '+content' : '-content');

    if (!story)
      return next(ErrorResponse(400, 'No resources found with this id.'));

    if (!isPublish) {
      story.isPublished = false;
      story = await story.save();
      return res.status(200).json({ status: 'ok', story });
    }

    try {
      return res
        .status(200)
        .json({ status: 'ok', story: await story.publishedStory() });
    } catch (err: any) {
      return next(ErrorResponse(400, err));
    }
  }
);

export const schema = object({
  params: object({
    storyId: string()
      .label('storyId')
      .required()
      .typeError('StoryId must be string type.')
      .test('storyId', 'Story Id must be a valid', (val) =>
        isValidObjectId(val)
      ),
  }),
});

export default [validateSchema(schema), ctrl];
