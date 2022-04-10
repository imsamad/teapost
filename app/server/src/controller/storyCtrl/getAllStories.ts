import { Request, Response, NextFunction } from "express";

import { asyncHandler, peelUserDoc } from "../../lib/utils";
import Story from "../../models/Story";

// @desc      Get all stories
// @route     GGET /api/v1/story
// @access    Public
const getAllStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // return res.json(
    //   await Story.find({ author: "6221be7444eaf2d6fc67b964" })
    //     .select("-content")
    //     .lean()
    // );
    const filter =
      process.env.ONLY_VERIFIED_ALLOWED == "true"
        ? {
            isPublished: true,
            isPublishedByAdmin: true,
          }
        : {};

    // @ts-ignore
    let stories: any = Story.find({ ...req.query, ...filter }).populate([
      {
        path: "author",
        transform: (v: any) => peelUserDoc(v),
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
            path: "user",
            transform: (v: any) => peelUserDoc(v),
          },
          {
            path: "secondary",
            populate: [
              {
                path: "user",
                transform: (v: any) => peelUserDoc(v),
              },
              {
                path: "secondaryUser",
                transform: (v: any) => peelUserDoc(v),
              },
            ],
          },
        ],
      });
    }
    // @ts-ignore
    let page: number = req.query.page!,
      // @ts-ignore
      limit: number = req.query.limit,
      // @ts-ignore
      startIndex = (page - 1) * limit,
      endIndex = page * limit;

    stories = await stories.skip(startIndex).limit(limit).lean();
    let pagination: any = { limit };
    if (stories.length) {
      pagination.next = page + 1;
    }
    if (startIndex > 0) pagination.prev = page - 1;

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
    // return res.json(await Story.find({}).lean());
    return res.status(200).json({
      status: "ok",
      pagination,
      stories,
      // @ts-ignore
      authors: req.authors || {},
    });
  }
);

export default getAllStories;
