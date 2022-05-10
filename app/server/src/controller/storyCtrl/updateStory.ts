import { Request, Response, NextFunction } from 'express';

import {
  asyncHandler,
  ErrorResponse,
  readingTime as readingTimeFun,
  validateYupSchema,
} from '../../lib/utils';
import Story, { StoryDocument, storyAllowedFields } from '../../models/Story';
import { isAbleToPublished } from '../../lib/schema/storySchema';
import StoryHistory from '../../models/StoryHistory';

import { array, object, string } from 'yup';

import { isValidObjectId } from 'mongoose';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      Create a story
// @route     POST / PUT /api/v1/story/:storyId
// @access    Auth [Reader]
const ctrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const storyId = req.params.storyId;

    const story = await Story.findById(storyId);
    // @ts-ignore
    const userId = req.user._id.toString();
    // not any story OR not author OR not collabrating
    const isCollabing = story?.collabWith
      .map((id) => id.toString())
      .includes(userId);

    if (!story || (story.author.toString() != userId && !isCollabing))
      return next(ErrorResponse(400, 'No resource found'));

    let warnings: { [name: string]: string[] } = {};
    if (req?.query?.addToHistory != 'false') {
      await StoryHistory.findByIdAndUpdate(
        storyId,
        {
          _id: storyId,
          $push: {
            instances: {
              story: JSON.stringify(story.toJSON()),
              createdAt: Date.now(),
            },
          },
        },
        { upsert: true }
      );
    }

    var { slug, ...rest } = req.body;
    // @ts-ignore
    // for (var key in rest) story[key] = req.body[key];
    storyAllowedFields.forEach((field) => {
      // @ts-ignore
      rest?.[field] && (story[field] = rest[field]);
    });

    if (slug && story.slug != slug) {
      const isStoryExist = await Story.findOne({
        slug: req.body.slug,
      });

      if (isStoryExist) {
        warnings['slug'] = ['This slug already exist.'];
      } else story.slug = req.body.slug;
    }

    story.readingTime = readingTimeFun(story?.content);
    // try {
    let newStory = await story.save();

    return res.status(200).json({
      status: 'ok',
      message: warnings,
      story: newStory,
    });
    // } catch (err) {
    //   console.log('err ', err);
    //   res.json({ err });
    // }
  }
);

export const schema = object({
  body: object({
    title: string().label('title').typeError('Title must be string.'),
    subtitle: string().label('subtitle').typeError('Subtitle must be string'),

    keywords: string()
      .label('keywords')
      .typeError('Keywords must be string/url type'),
    tags: array()
      .label('tags')
      .typeError('tags must of type array')
      .test((val) =>
        !val
          ? true
          : val && Array.isArray(val)
          ? val.every((v) => isValidObjectId(v))
          : false
      ),

    slug: string().label('slug').typeError('Slug must be string/url type'),
    content: string()
      .label('content')
      .typeError('Content must be string/url type'),
    titleImage: string()
      .label('titleImage')
      .url('titleImage must be url')
      .typeError('titleImage must be url'),
  }),
});
export default [validateSchemaMdlwr(schema), ctrl];
