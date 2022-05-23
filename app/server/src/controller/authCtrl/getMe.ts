import { Request, Response } from 'express';

import { asyncHandler } from '../../lib/utils';

import User from '../../models/User';

// @desc      Profile of logged in user
// @route     GET /api/v1/auth/me
// @access    Auth
const getMe = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user._id;

  const myProfile = await User.findById(userId).populate('profile');

  return res.json({
    status: 'ok',
    myProfile,
  });
});

export default getMe;
