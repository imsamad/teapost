import { Request, Response, NextFunction } from "express";

import {
  asyncHandler,
  ErrorResponse,
  validateYupSchema,
} from "../../lib/utils";
import Story, { StoryDocument } from "../../models/Story";
import { isAbleToPublished } from "../../lib/schema/story";

// @desc      Create a story
// @route     POST / PUT /api/v1/story
// @access    Auth [Reader]
const createOrUpdateStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let query: Partial<{ _id: any; slug: any }> = {};

    if (req.body.id) query._id = req.body.id;
    else query.slug = req.body.slug;

    const storyExist = await Story.findOne(query);

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
        const storyExistWithNewSlug = await Story.findOne({
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
      let newStory = new Story({
        ...rest,
        // @ts-ignore
        author: req.user._id,
      });
      // await StoryMeta.create({ _id: newStory.id });
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

export default createOrUpdateStory;
