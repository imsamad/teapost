import { Request, Response, NextFunction } from "express";
import { asyncHandler, readingTime as readingTimeFun } from "../../lib/utils";

import Story from "../../models/Story";
import { nanoid } from "nanoid";
// @desc      Initialize Story
// @route     GET /api/v1/stories/initialize
// @access    Auth,Admin,Public

export const initializeStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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

    const isStoryExist = await Story.findOne({
      slug,
    });
    //  @ts-ignore
    let author = req.user._id;
    if (isStoryExist) {
      if (isStoryExist.author.toString() == author)
        return res.json({
          status: "ok",
          story: isStoryExist,
        });
      else slug = slug + nanoid(10);
    }
    const story = await Story.create({
      author,
      readingTime: readingTimeFun(rest?.content),
      slug,
      ...rest,
    });
    return res.json({
      status: "ok",
      story,
    });
  }
);

export default initializeStory;
