import { Request, Response, NextFunction } from "express";

import {
  asyncHandler,
  ErrorResponse,
  validateYupSchema,
} from "../../lib/utils";
import Story, { StoryDocument } from "../../models/Story";
import { isAbleToPublished } from "../../lib/schema/story";
import StoryHistory from "../../models/StoryHistory";

// @desc      Create a story
// @route     POST / PUT /api/v1/story
// @access    Auth [Reader]
const createOrUpdateStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let query: Partial<{
      _id: StoryDocument["_id"];
      slug: StoryDocument["slug"];
    }> = {};

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
      // @ts-ignore
      for (var key in rest) storyExist[key] = req.body[key];

      if (id && slug && storyExist.slug !== slug) {
        const isStoryExistWithNewSlug = await Story.findOne({
          slug: req.body.slug,
        });

        if (isStoryExistWithNewSlug) {
          extraMessage["slug"] = ["This slug already exist."];
        } else storyExist.slug = req.body.slug;
      }

      if (typeof isPublished !== "undefined" && req.body.isPublished === false)
        storyExist.isPublished = false;
      storyExist.readingTime = 10;
      const storyInstance = (await storyExist.save()).toJSON();
      await StoryHistory.findByIdAndUpdate(
        storyExist._id,
        {
          _id: storyExist._id,
          $push: {
            instances: {
              story: JSON.stringify(storyInstance),
              createdAt: Date.now(),
            },
          },
        },
        { upsert: true }
      );
      console.log("first", JSON.parse(JSON.stringify(storyInstance)));
      return res.status(200).json({
        status: "ok",
        story: storyInstance,
        message: extraMessage,
      });
      // sendResponse(req.body.isPublished, storyExist, res, extraMessage);
    } else {
      const story = (
        await Story.create({
          ...req.body,
          // @ts-ignore
          author: req.user._id,
          isPublished: false,
        })
      ).toJSON();
      await StoryHistory.findByIdAndUpdate(
        story._id,
        {
          _id: story._id,
          $push: {
            instances: { story: JSON.stringify(story), createdAt: Date.now() },
          },
        },
        { upsert: true }
      );
      return res.status(200).json({
        status: "ok",
        story,
      });

      // await StoryMeta.create({ _id: newStory.id });
      // sendResponse(isPublished, newStory, res);
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
