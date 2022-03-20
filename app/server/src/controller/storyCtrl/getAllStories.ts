import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../../lib/utils";
import Story from "../../models/Story";

// @desc      Get all stories
// @route     GGET /api/v1/story
// @access    Public
const getAllStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let stories: any = Story.find(req.query).populate([
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
    // @ts-ignore
    if (req.query?.select?.includes("comments")) {
      stories.populate({
        path: "comments",
        populate: [
          {
            path: "meta",
          },
          {
            path: "user",
            select: "username email",
          },
          {
            path: "secondary",
            populate: [
              {
                path: "meta",
              },
              {
                path: "user",
                select: "username email",
              },
              {
                path: "replyToSecondaryUser",
                select: "username email",
              },
            ],
          },
        ],
      });
    }

    stories = await stories.lean();
    return res.status(200).json({
      status: "ok",
      stories,
    });
  }
);

export default getAllStories;
