import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import Story from '../../models/Story';
import StoryHistory, { ParseDoc } from '../../models/StoryHistory';

// @desc      getStoryHistory
// @route     GET /api/v1/storyhistories/:storyId
// @access    Auth,Admin,Public

export const getStoryHistory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const storyExist = await Story.findById(req.params.storyId);

    // @ts-ignore
    if (!storyExist || storyExist.author.toString() != req.user._id)
      return next(ErrorResponse(400, 'No resource found'));

    let storyHistory = await StoryHistory.findById(req.params.storyId);
    if (!storyHistory) return next(ErrorResponse(400, 'No history found.'));

    res.send({
      status: 'ok',
      storyHistory: ParseDoc(storyHistory),
    });
  }
);

export default getStoryHistory;
