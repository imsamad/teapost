import { Request, Response } from 'express';

import { asyncHandler } from '../../lib/utils';
import Profile from '../../models/Profile';
import { peelUserDoc } from '../../models/User';

// @desc      Profile of logged in user
// @route     GET /api/v1/auth/me
// @access    Auth
const getMe = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user._id;
  let query = Profile.findById(user).populate([{ path: 'storyCollections' }]);

  if (req.query.populateStory) query.populate('likedStories dislikedStories');

  const profile = await query;

  return res.json({
    status: 'ok',
    user: {
      // @ts-ignore
      ...peelUserDoc(req.user),
      profile,
    },
  });
});

export default getMe;
