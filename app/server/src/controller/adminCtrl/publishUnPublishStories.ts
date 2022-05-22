import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../lib/utils';
import * as yup from 'yup';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
import { isValidObjectId } from 'mongoose';
import Story from '../../models/Story';

const publishUnPublishStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const isPublishedByAdmin = req.originalUrl
      .split('/')
      .pop()
      ?.startsWith('publish');

    console.log('isPublishedByAdmin ', isPublishedByAdmin);
    const stories = await Story.updateMany(
      { _id: { $in: req.body.storyIds } },
      { isPublishedByAdmin: isPublishedByAdmin ? true : false }
    );

    return res.status(200).json({
      success: 200,
      message: `Stories have been ${
        isPublishedByAdmin ? 'published' : 'unpublished'
      }`,
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

export default [validateSchemaMdlwr(schema), publishUnPublishStories];
