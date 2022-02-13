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
    console.log('create ', req.body);
    // @ts-ignore
    const author = req.user;
    const { id, slug, ...rest } = req.body;

    let storyObj: any = {
      author,
      ...rest,
    };

    // if (tags?.length) storyObj.tags = tags;
    // if (tags?.length) storyObj.$addToSet = { tags };

    let queryObj: { slug?: string; _id?: string; author: string } = {
      author,
    };

    if (id) {
      queryObj._id = id;
    } else {
      queryObj.slug = slug;
      storyObj.slug = slug;
    }

    let story = await StoryModel.findOneAndUpdate(queryObj, storyObj, {
      new: true,
      upsert: true,
    });
    res.status(200).json({
      success: true,
      data: story,
    });
  }
);

export const handleTags = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body?.tags?.length && !req.body?.additionalTags?.length) {
      req.body.tags = [];
      return next();
    }

    let alreadyExistedTags: StorySchemaDocument['_id'] = [];
    let newTags: any = [];

    req.body?.tags?.forEach((tag: string) => {
      isValidObjectId(tag) ? alreadyExistedTags.push(tag) : newTags.push(tag);
    });
    if (req.body?.additionalTags?.length)
      req.body?.additionalTags?.forEach((tag: string) => {
        isValidObjectId(tag) ? alreadyExistedTags.push(tag) : newTags.push(tag);
      });

    req.body.tags = [];
    req.body.additionalTags = '';
    if (!newTags.length) {
      req.body.tags = alreadyExistedTags;
      return next();
    }
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
