import { Request, Response, NextFunction } from 'express';

import {
  asyncHandler,
  ErrorResponse,
  validateYupSchema,
} from '../../lib/utils';
import Story from '../../models/Story';
import { isAbleToPublished } from '../../lib/schema/storySchema';
import validateSchema from '../../middleware/validateSchemaMdlwr';
import { boolean, object, string } from 'yup';
import { isValidObjectId } from 'mongoose';

// @desc      Published story story
// @route     PUT /api/v1/story/published/:storyId
// @access    Auth [Reader]
const ctrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isPublish = req.originalUrl.startsWith('/publish');
    let story = await Story.findById(req.params.storyId).select(
      '+hadEmailedToFollowers'
    );

    if (!story)
      return next(ErrorResponse(400, 'No resources found with this id.'));

    if (!isPublish) {
      story.isPublished = false;
      story = await story.save();
      return res.status(200).json({ status: 'ok', story });
    }

    try {
      await validateYupSchema(isAbleToPublished, story);

      story.isPublished = req.body.isPublished ?? true;
      if (!story.hadEmailedToFollowers) {
        /*
         * Send Email To Followers of story.author
         *****************************************************/

        story.hadEmailedToFollowers = true;
      }
      story = await story.save();
      return res.status(200).json({ status: 'ok', story });
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
