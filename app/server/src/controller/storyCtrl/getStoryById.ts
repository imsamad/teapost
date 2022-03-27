import { Request, Response, NextFunction } from "express";

import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Story from "../../models/Story";

// @desc      getStoryById
// @route     GET /api/v1/stories/:storyId
// @access    Auth,Admin,Public

export const getStoryById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const story = await Story.findById(req.params.storyId).lean();
    if (story?.isPublished) {
      return res.json({
        status: "ok",
        story,
      });
    } else {
      // @ts-ignore
      const user = req?.user?._id;
      if (user && user == story?.author.toString())
        return res.json({
          status: "ok",
          story,
        });
      else {
        return res.status(400).json({
          status: "error",
        });
      }
    }
  }
);

export default getStoryById;
