import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import { isValidObjectId } from 'mongoose';
import Story from '../../models/Story';

const publishedMultipleStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isPublishMany =
      req?.originalUrl?.split('/')?.pop()?.toLowerCase() == 'publishedmany';

    // @ts-ignore
    const author = req.user._id.toString();

    const stories = await Story.find({
      author,
      _id: { $in: [...new Set(req.body.storyIds)] },
    });
    if (!stories.length) return next(ErrorResponse(400, 'Resource not found'));

    const promiseResolved = await Promise.allSettled(
      stories.map((story) => {
        if (!isPublishMany) {
          story.isPublished = false;
          return story.save();
        } else {
          return story.publishedStory();
        }
      })
    );

    return res.json({
      stories: promiseResolved
        .filter((story) => story.status == 'fulfilled')
        // @ts-ignore
        .map((promise) => promise?.value),
      message: promiseResolved
        .filter((story) => story.status == 'rejected')
        // @ts-ignore
        .map((promise) => promise?.reason),
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

export default [validateSchemaMdlwr(schema), publishedMultipleStories];
