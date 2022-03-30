import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../../lib/utils";
import Story from "../../models/Story";

// @desc      Get all stories
// @route     GGET /api/v1/story
// @access    Public
const getAllStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const filter =
      process.env.ONLY_VERIFIED_ALLOWED == "true"
        ? {
            isPublished: true,
            isPublishedByAdmin: true,
          }
        : {};
    let stories: any = Story.find({ ...req.query, ...filter }).populate([
      { path: "meta" },
      {
        path: "author",
        select: "username email",
        populate: {
          path: "profile",
          select: "fullName followers tagLines profilePic",
        },
      },
      {
        path: "tags",
        select: "title",
      },
    ]);
    if (req.query.nocontent == "true") stories.select("-content");
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
    if (req.query.cutcontent) {
      stories = stories.map((story: any) => {
        return {
          ...story,

          content: story.content.substr(
            0, // @ts-ignore
            parseInt(req.query.cutcontent, 10)
          ),
        };
      });
    } else if (req.query.onlycontent) {
      stories = stories.map(({ content }: any) => ({ content }));
    }
    return res.status(200).json({
      status: "ok",
      stories,
      // @ts-ignore
      authors: req.authors || {},
    });
  }
);

export default getAllStories;
