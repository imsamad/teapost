import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../lib/utils';
import Story from '../../models/Story';

const myStories = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  const author = req.user._id;

  return res.status(200).json({
    success: 200,
    stories: await Story.find({ author })
      .select('-content')
      .populate([
        {
          path: 'collabWith',
          select: 'username fullName email',
        },
      ]),
  });
});

export default myStories;
