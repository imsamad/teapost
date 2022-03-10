import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { asyncHandler, ErrorResponse, validateYupSchema } from "../lib/utils";
import ProfileModel from "../models/ProfileModel";
import StoryMetaModel from "../models/StoryMetaModel";
import StoryModel, { StoryDocument } from "../models/StoryModel";
import TagModel, { TagDocument } from "../models/TagModel";
import { UserDocument } from "../models/UserModel";
import { isAbleToPublished } from "../schema/story";

// @desc      Create a story
// @route     POST / PUT /api/v1/story
// @access    Auth [Reader]
export const createOrUpdateStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let query: Partial<{ _id: any; slug: any }> = {};

    if (req.body.id) query._id = req.body.id;
    else query.slug = req.body.slug;

    const storyExist = await StoryModel.findOne(query);

    if (storyExist) {
      let extraMessage: { [name: string]: string[] } = {};
      // @ts-ignore
      if (storyExist.author.toString() !== req.user._id.toString()) {
        return next(ErrorResponse(400, "this slug already exist"));
      }

      var { id, slug, isPublished, ...rest } = req.body;

      Object.keys(rest).forEach((field: any) => {
        // @ts-ignore
        storyExist[field] = req.body[field];
      });

      if (req.body.id && req.body.slug && storyExist.slug !== req.body.slug) {
        const storyExistWithNewSlug = await StoryModel.findOne({
          slug: req.body.slug,
        });
        if (storyExistWithNewSlug) {
          extraMessage["slug"] = ["This slug already exist."];
        } else storyExist.slug = req.body.slug;
      }

      // explicit
      if (
        typeof req.body.isPublished !== "undefined" &&
        req.body.isPublished === false
      )
        storyExist.isPublished = false;

      // console.log('story ', storyExist);

      sendResponse(req.body.isPublished, storyExist, res, extraMessage);
    } else {
      const { id, isPublished, ...rest } = req.body;
      let newStory = new StoryModel({
        ...rest,
        // @ts-ignore
        author: req.user._id,
      });
      await StoryMetaModel.create({ _id: newStory.id });
      sendResponse(isPublished, newStory, res);
    }
  }
);

const sendResponse = async (
  isPublished: StoryDocument["isPublished"],
  story: StoryDocument,
  res: Response,
  extraMessage?: any
) => {
  if (isPublished) {
    try {
      const result = await validateYupSchema(isAbleToPublished, story);
      story.isPublished = true;
      story = await story.save();
      return res.status(200).json({
        status: "ok",
        story: story,
        message: extraMessage,
      });
    } catch (err: any) {
      story.isPublished = false;
      story = await story.save();

      return res.status(200).json({
        status: "ok",
        story,
        message: err,
      });
    }
  } else {
    story = await story.save();

    return res.status(200).json({
      status: "ok",
      story,
      message: extraMessage,
    });
  }
};

// @desc      Get all stories
// @route     GGET /api/v1/story
// @access    Public
export const getAllStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query: any = req.query;

    const stories = await StoryModel.find({
      // isPublished: true,
      ...query,
    }).populate([
      { path: "meta" },
      {
        path: "author",
        select: "username email",
      },
      {
        path: "tags",
        select: "tag",
      },
    ]);

    return res.status(200).json({
      status: "ok",
      stories,
    });
  }
);

export const handleTags = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body?.tags?.length && !req.body?.additionalTags?.length) {
      // req.body.tags
      return next();
    }

    let alreadyExistedTags: StoryDocument["_id"] = [];
    let newTags: any = [];

    req.body?.tags?.forEach((tag: string) => {
      isValidObjectId(tag) ? alreadyExistedTags.push(tag) : newTags.push(tag);
    });
    if (req.body?.additionalTags?.length)
      req.body?.additionalTags?.forEach((tag: string) => {
        isValidObjectId(tag) ? alreadyExistedTags.push(tag) : newTags.push(tag);
      });

    req.body.tags = [];
    req.body.additionalTags = "";
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
              .then((oldTag: TagDocument) => {
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

// @desc      Published story story
// @route     PUT /api/v1/story/published/:storyId
// @access    Auth [Reader]
export const publishedStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let story = await StoryModel.findById(req.params.storyId);

    if (!story)
      return next(ErrorResponse(400, "No resources found with this id."));

    try {
      await validateYupSchema(isAbleToPublished, story);

      story.isPublished = req.body.isPublished ?? true;
      story = await story.save();

      return res.status(200).json({ status: "ok", story });
    } catch (err: any) {
      return next(ErrorResponse(400, err));
    }
  }
);

// @desc      Like/Dislike story
// @route     PUT /api/v1/story/like/:storyId
// @route     PUT /api/v1/story/like/undo/:storyId
// @route     PUT /api/v1/story/dislike/:storyId
// @route     PUT /api/v1/story/dislike/undo/:storyId
// @access    Auth [Reader]
export const gradeStory = (isLike: boolean, gradeCount: number) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const storyId = req.params.storyId as StoryDocument["id"];
    let story = await StoryModel.findById(storyId);

    if (!story) return next(ErrorResponse(400, "Resource not found"));

    // @ts-ignore
    const user: UserDocument["_id"] = req.user._id.toString();

    /*
    like i.e like > 0  then, push likedStories,pull from dislikedStories(in case had been disliked)
    revert i.e. like <=0 then,  pull from likedStories
    
    dislike i.e. dislike > 0 then, push dislikedStories,pull from likedStories(in case had been liked)
    revert dislike => pull from didikeStories    
    */

    const profile = await ProfileModel.findByIdAndUpdate(
      user,
      isLike
        ? gradeCount > 0
          ? {
              _id: user,
              $addToSet: { likedStories: storyId },
              $pull: { dislikedStories: storyId },
            }
          : { _id: user, $pull: { likedStories: storyId } }
        : gradeCount > 0
        ? {
            _id: user,
            $addToSet: { dislikedStories: storyId },
            $pull: { likedStories: storyId },
          }
        : { _id: user, $pull: { dislikedStories: storyId } },
      { upsert: true, new: true }
    );
    const storyMeta = await StoryMetaModel.findByIdAndUpdate(
      storyId,
      isLike
        ? gradeCount > 0
          ? {
              _id: storyId,
              $addToSet: { likedBy: user },
              $pull: { dislikedBy: user },
            }
          : { _id: storyId, $pull: { likedBy: user } }
        : gradeCount > 0
        ? {
            _id: storyId,
            $addToSet: { dislikedBy: user },
            $pull: { likedBy: user },
          }
        : { _id: storyId, $pull: { dislikedBy: user } },

      { upsert: true, new: true }
    );
    res.json({
      status: "ok",
      storyMeta,
    });
  });
