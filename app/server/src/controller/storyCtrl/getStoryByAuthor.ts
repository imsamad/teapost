import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../lib/utils";
import Story from "../../models/Story";
import User from "../../models/User";
// @desc      getStoryByAuthor
// @route     GET /api/v1/stories/author/:authorUsername
// @access    Auth,Admin,Public

export const getStoryByAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({
      username: req.params.authorUsername,
    });
    if (!user) {
      return res.json({
        status: "ok",
        stories: [],
      });
    }
    let userId = user._id.toString();

    const stories = await Story.find({
      author: userId,
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

export default getStoryByAuthor;
