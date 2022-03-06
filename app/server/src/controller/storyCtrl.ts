import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { asyncHandler, ErrorResponse, validateYupSchema } from "../lib/utils";
import GradeModel from "../models/GradeModel";
import StoryModel, { StoryDocument } from "../models/StoryModel";
import TagModel, { TagModelDocument } from "../models/TagModel";
import { isAbleToPublished } from "../schema/story";

// @desc      Create a story
// @route     POST /api/v1/story
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
      if (storyExist.author.toString() !== req.user) {
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
        author: req.user,
      });
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

// @desc      Change slug story
// @route     PUT /api/v1/story/changeslug
// @access    Auth [Reader]
export const changeSlug = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const story = await StoryModel.findById(req.body.id);
    if (!story)
      return next(ErrorResponse(400, `Story not found for ${req.body.id} `));
    if (req.body.slug === story.slug)
      return res.status(200).json({
        status: "ok",
        story,
      });

    story.slug = req.body.slug;
    await story.save();
    return res.status(200).json({
      status: "ok",
      story,
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
// @route     PUT /api/v1/story/dislike/:storyId
// @access    Auth [Reader]
export const gradeStory = (isLike = true) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const storyId = req.params.storyId as StoryDocument["id"];
    let story = await StoryModel.findById(storyId);

    if (!story) return next(ErrorResponse(400, "Resource not found"));
    // @ts-ignore
    let grade = await GradeModel.findOne({ user: req.user });
    if (!grade) {
      let newGrade = new GradeModel({
        // @ts-ignore
        user: req.user,
      });
      console.log("newGrade ", newGrade);
      if (isLike) {
        newGrade.likeStories.push(storyId);
        story.like++;
      } else {
        newGrade.dislikeStories.push(storyId);
        story.dislike++;
      }

      story = await story.save();
      newGrade = await newGrade.save();
      return res.json({
        status: "ok",
        // grade: newGrade,
        story,
      });
    }
    if (isLike) {
      const alreadyLiked = grade.likeStories.indexOf(storyId);
      if (alreadyLiked > -1) {
        grade.likeStories.splice(alreadyLiked, 1);
        story.like--;
        grade = await grade.save();
        story = await story.save();
        return res.json({
          status: "ok",
          // grade,
          story,
        });
      }

      const hasBeenDisliked = grade.dislikeStories.indexOf(storyId);

      if (hasBeenDisliked > -1) {
        grade.dislikeStories.splice(hasBeenDisliked, 1);
        story.dislike--;
      }
      grade.likeStories.push(storyId);
      story.like++;
    } else if (!isLike) {
      const alreadyDisliked = grade.dislikeStories.indexOf(storyId);
      if (alreadyDisliked > -1) {
        grade.dislikeStories.splice(alreadyDisliked, 1);
        story.dislike--;
        grade = await grade.save();
        story = await story.save();
        return res.json({
          status: "ok",
          // grade,
          story,
        });
      }

      const hasBeenLiked = grade.likeStories.indexOf(storyId);
      if (hasBeenLiked > -1) {
        grade.likeStories.splice(hasBeenLiked, 1);
        story.like--;
      }
      grade.dislikeStories.push(storyId);
      story.dislike++;
    }
    story = await story.save();
    grade = await grade.save();
    res.json({
      status: "ok",
      // grade,
      story,
    });
  });
