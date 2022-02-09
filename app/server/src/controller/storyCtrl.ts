import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { asyncHandler } from '../lib/utils';
import StoryModel, { StorySchemaDocument } from '../models/StoryModel';
import TagModel, { TagModelDocument } from '../models/TagModel';

// @desc      Create a story
// @route     POST /api/v1/story
// @access    Auth [Reader]
export const createOrUpdateStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req?.body?.isPublished) req.body.isPublished = false;
    console.log('req.body ', req.body);
    // @ts-ignore
    const author = req.user;
    const { tags, storyId, slug, ...rest } = req.body;

    let storyObj: any = {
      author,
      ...rest,
    };

    if (tags?.length) storyObj.$addToSet = { tags };

    let queryObj: { slug?: string; id?: string; author: string } = {
      author,
    };

    if (slug) {
      queryObj.slug = slug;
      storyObj.slug = slug;
    } else queryObj.id = storyId;

    let story = await StoryModel.findOneAndUpdate(queryObj, storyObj, {
      new: true,
      upsert: true,
    });
    res.status(200).json(story);
  }
);

export const handleTags = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body?.tags?.length) return next();
    let alreadyExistedTags: StorySchemaDocument['_id'] = [];
    let newTags: any = [];

    req.body.tags.forEach((tag: string) => {
      // @ts-ignore
      isValidObjectId(tag) ? alreadyExistedTags.push(tag) : newTags.push(tag);
    });

    req.body.tags = [];
    if (!newTags.length) return next();
    let oldTags: any = [];
    newTags = newTags.map((tag: String) =>
      TagModel.create({ tag })
        .then((res) => {
          alreadyExistedTags?.push(res.id || res._id);
          return res;
        })
        .catch((err) => {
          oldTags.push(
            TagModel.findOne({ tag })
              .then((oldTag: TagModelDocument) => {
                alreadyExistedTags.push(oldTag.id || oldTag._id);
              })
              .catch((err) => {})
          );
          return err;
        })
    );

    Promise.allSettled(newTags).then((resOuter) => {
      Promise.allSettled(oldTags).then((resInner) => {
        req.body.tags = alreadyExistedTags;
        next();
      });
    });
  }
);
