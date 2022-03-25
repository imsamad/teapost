import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../lib/utils";

import Story from "../../models/Story";
import { nanoid } from "nanoid";
// @desc      Initialize Story
// @route     GET /api/v1/stories/initialize
// @access    Auth,Admin,Public

export const initializeStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let slug = req.body.slug;

    const isStoryExist = await Story.findOne({
      slug,
    });
    //  @ts-ignore
    let author = req.user._id;

    if (isStoryExist && isStoryExist.author.toString() == author)
      return res.json({
        status: "ok",
        story: isStoryExist,
      });

    const story = await Story.create({
      slug: nanoid(10),
      author,
    });
    return res.json({
      status: "ok",
      story,
    });
  }
);

export default initializeStory;
