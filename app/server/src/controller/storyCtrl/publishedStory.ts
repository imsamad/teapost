import { Request, Response, NextFunction } from "express";

import {
  asyncHandler,
  ErrorResponse,
  validateYupSchema,
} from "../../lib/utils";
import Story from "../../models/Story";
import { isAbleToPublished } from "../../lib/schema/story";

// @desc      Published story story
// @route     PUT /api/v1/story/published/:storyId
// @access    Auth [Reader]
const publishedStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let story = await Story.findById(req.params.storyId).select(
      "emailToFollowers"
    );

    if (!story)
      return next(ErrorResponse(400, "No resources found with this id."));

    try {
      await validateYupSchema(isAbleToPublished, story);

      story.isPublished = req.body.isPublished ?? true;
      if (!story.hadEmailedToFollowers) {
        /**
         * Send Email To Followers of story.author
         *****************************************************/
        story.hadEmailedToFollowers = true;
      }
      story = await story.save();
      return res.status(200).json({ status: "ok", story });
    } catch (err: any) {
      return next(ErrorResponse(400, err));
    }
  }
);

export default publishedStory;
