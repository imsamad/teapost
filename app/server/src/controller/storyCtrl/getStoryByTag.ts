import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../lib/utils";
import Story from "../../models/Story";
import Tag from "../../models/Tag";
// @desc      getStoryByTag
// @route     GET /api/v1/stories/tag/:tagName
// @access    Auth,Admin,Public

export const getStoryByTag = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tag = await Tag.findOne({
      title: req.params.tagName,
    });
    if (!tag) {
      return res.json({
        status: "ok",
        stories: [],
      });
    }
    let tagId = tag._id.toString();

    const stories = await Story.find({
      tags: { $in: tagId },
    }).populate([
      { path: "meta" },
      {
        path: "author",
        select: "username email",
      },
      {
        path: "tags",
        select: "title",
      },
    ]);
    res.json({
      status: "ok",
      stories: !stories.length ? [] : stories,
    });
  }
);

export default getStoryByTag;
