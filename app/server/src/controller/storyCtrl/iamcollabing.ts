import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../lib/utils';

import Story from '../../models/Story';

const iamcollabing = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id.toString();

    return res.status(200).json({
      success: 200,
      stories: await Story.find({ collabWith: { $in: user } }).select(
        '-content'
      ),
    });
  }
);

export default iamcollabing;
