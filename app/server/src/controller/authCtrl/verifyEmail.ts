import { Request, Response, NextFunction } from 'express';

import { asyncHandler } from '../../lib/utils';
import User from '../../models/User';
import { ErrorResponse } from '../../lib/utils';
import { retriveToken } from '../../lib/createToken';
import Profile from '../../models/Profile';
import StoryCollection from '../../models/StoryCollection';

// @desc      Verify Email
// @route     GET /api/v1/auth/verifyemail
// @access    Public

const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jwtCodedToken: string = req.params.token as string;

    const malliciousReq = ErrorResponse(400, 'Mallicious request.');
    try {
      const token = await retriveToken(jwtCodedToken);

      if (token.type == 'resetPassword') return next(malliciousReq);

      const user = await User.findById(token.userId.toString());

      if (!user) return next(malliciousReq);
      // @ts-ignore
      if (token.type == 'verifyChangedEmail') user.email = token.newEmail;
      else if (token.type == 'verifyRegistration') {
        await Profile.create({ _id: user._id.toString() });
        await StoryCollection.create({
          user: user._id.toString(),
          title: 'Read Later',
        });
      }
      user.isEmailVerified = true;

      await user.save();

      await token.delete();

      res.status(200).json({
        status: 'ok',
        message: 'Email verfied successfully.',
      });
    } catch (err) {
      return next(malliciousReq);
    }
  }
);

export default verifyEmail;
