import { Request, Response, NextFunction } from "express";

import {
  asyncHandler,
  ErrorResponse,
  readingTime as readingTimeFun,
  validateYupSchema,
} from "../../lib/utils";
import Story, { StoryDocument } from "../../models/Story";
import { isAbleToPublished } from "../../lib/schema/story";
import StoryHistory from "../../models/StoryHistory";

// @desc      Create a story
// @route     POST / PUT /api/v1/story/:storyId
// @access    Auth [Reader]
const updateStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const storyId = req.params.storyId;

    const story = await Story.findById(storyId),
      // @ts-ignore
      userId = req.user._id.toString();

    if (
      !story ||
      (story.author.toString() != userId &&
        !story.collabWith.map((id) => id.toString()).includes(userId))
    )
      return next(ErrorResponse(400, "No resource found"));

    let extraMessage: { [name: string]: string[] } = {};

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

    var {
      slug,
      isPublished,
      hadEmailedToFollowers,
      isPublishedByAdmin,
      readingTime,
      noOfViews,
      noOfComments,
      noOfLikes,
      noOfDislikes,
      collabWith,
      ...rest
    } = req.body;
    // @ts-ignore
    for (var key in rest) story[key] = req.body[key];

    if (slug && story.slug != slug) {
      const isStoryExist = await Story.findOne({
        slug: req.body.slug,
      });

      if (isStoryExist) {
        extraMessage["slug"] = ["This slug already exist."];
      } else story.slug = req.body.slug;
    }

    story.readingTime = readingTimeFun(story?.content);

    return res.status(200).json({
      status: "ok",
      story: (await story.save()).toJSON(),
      message: extraMessage,
    });
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

export default updateStory;
