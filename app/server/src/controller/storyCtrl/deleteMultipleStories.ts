import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import Story from '../../models/Story';
import { isValidObjectId } from 'mongoose';

const deleteMultipleStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const author = req.user._id.toString();

    const stories = await Story.find({
      author,
      _id: { $in: [...new Set(req.body.storyIds)] },
    });

    if (!stories.length) return next(ErrorResponse(400, 'Resource not found'));

    const promiseResolved = await Promise.allSettled(
      stories.map((story) => story.remove())
    );

    return res.json({
      stories: promiseResolved
        .filter((story) => story.status == 'fulfilled')
        // @ts-ignore
        .map((promise) => promise?.value),
    });
  }
);

const schema = yup.object({
  body: yup.object({
    storyIds: yup
      .array()
      .label('storyIds')
      .required()
      .typeError('StoryIds must be array of storyId')
      .of(
        yup
          .string()
          .label('storyIds')
          .test('storyIds', 'Provide valid storyIds', isValidObjectId)
      )
      .min(1),
  }),
});

export default [validateSchemaMdlwr(schema), deleteMultipleStories];
