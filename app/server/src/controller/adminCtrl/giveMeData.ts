import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../lib/utils';
import User from '../../models/User';
import Story from '../../models/Story';

const giveMeData = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let users: any = null;
    let stories: any = null;

    //  @ts-ignore
    const author = req.user._id.toString();
    const reqQuery =
      typeof req?.query?.data == 'string' ? req?.query?.data.split(',') : [];
    //  @ts-ignore
    const giveMeStories = reqQuery.filter((val) =>
      ['story', 'stories'].includes(val)
    ).length;
    if (giveMeStories)
      stories = Story.find({ author: { $nin: author } })
        .select('-content')
        .populate([
          {
            path: 'author',
            select: 'username',
          },
          {
            path: 'collabWith',
            select: 'username email fullName',
          },
        ])
        .lean();

    //  @ts-ignore
    const giveMeUsers = reqQuery.filter((val) =>
      ['user', 'users'].includes(val)
    ).length;

    if (giveMeUsers) users = User.find({ _id: { $nin: author } }).lean();

    return res.status(200).json({
      success: 200,
      users: !users ? [] : await users,
      stories: !stories ? [] : await stories,
    });
  }
);

export default [giveMeData];
