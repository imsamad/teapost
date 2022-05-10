import { Request, Response, NextFunction } from 'express';
import { asyncHandler, readingTime } from '../../lib/utils';

import Story, { storyAllowedFields } from '../../models/Story';
import { nanoid } from 'nanoid';
import * as yup from 'yup';

import { isValidObjectId } from 'mongoose';
import validateSchema from '../../middleware/validateSchemaMdlwr';

// @desc      Initialize Story
// @route     POST /api/v1/stories/[initialize | init]
// @access    Auth
export const ctrl = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const storyExist = await Story.findOne({
      slug: req.body.slug,
    });
    //  @ts-ignore
    let author = req.user._id;

    /*
     *  1.) if story exist && requested by the author return as-it-is.
     *  2.) else modify slug create/init a new one
     */
    if (
      storyExist &&
      (storyExist.author.toString() == author ||
        storyExist.collabWith.map((id) => id.toString()).includes(author))
    ) {
      return res.json({
        status: 'ok',
        story: storyExist,
      });
    } else if (storyExist) {
      req.body.slug = req.body.slug + nanoid(10);
    }

    let reqBody: any = {};
    storyAllowedFields.forEach((field) => {
      req.body?.[field] && (reqBody[field] = req.body[field]);
    });

    const story = await Story.create({
      author,
      readingTime: readingTime(req.body?.content),
      ...reqBody,
    });
    return res.json({
      status: 'ok',
      story,
    });
  }
);

export const initializeStoryScheme = yup.object({
  body: yup.object({
    title: yup.string().label('title').typeError('Title must be string.'),
    subtitle: yup
      .string()
      .label('subtitle')
      .typeError('Subtitle must be string'),

    keywords: yup
      .string()
      .label('keywords')
      .typeError('Keywords must be string/url type'),
    tags: yup
      .array()
      .label('tags')
      .typeError('tags must of type array')
      .test((val) =>
        !val
          ? true
          : val && Array.isArray(val)
          ? val.every((v) => isValidObjectId(v))
          : false
      ),

    slug: yup
      .string()
      .label('slug')
      .typeError('Slug must be string/url type')
      .required(),
    content: yup
      .string()
      .label('content')
      .typeError('Content must be string/url type'),
    titleImage: yup
      .string()
      .label('titleImage')
      .url('titleImage must be url')
      .typeError('titleImage must be url'),
  }),
});
export default [validateSchema(initializeStoryScheme), ctrl];
