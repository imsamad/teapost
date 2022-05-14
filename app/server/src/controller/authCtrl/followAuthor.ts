import { Request, Response, NextFunction } from 'express';

import { asyncHandler, ErrorResponse } from '../../lib/utils';
import Profile from '../../models/Profile';
import User, { peelUserDoc } from '../../models/User';
import * as yup from 'yup';
import { isValidObjectId } from 'mongoose';
import validateSchemaMdlwr from '../../middleware/validateSchemaMdlwr';
// @desc      Follow author
// @route     GET /api/v1/auth/follow/:authorId
// @access    Auth
const followAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const toFollow = req?.path.startsWith('/follow');

    // @ts-ignore
    const userId = req.user._id.toString(),
      authorId = req.params.authorId;
    if (userId == authorId)
      return next(ErrorResponse(400, "You can't follow yourself"));
    const authorToFollow = await User.findOne({
      _id: authorId,
      isEmailVerified: true,
      isAuthorised: true,
    });
    if (!authorToFollow) return next(ErrorResponse(400, 'Resource not found'));
    const userProfile = await Profile.findByIdAndUpdate(
      userId,
      toFollow
        ? { $addToSet: { following: authorId } }
        : { $pull: { following: authorId } },
      {
        new: true,
      }
    );

    const authorProfile = await Profile.findByIdAndUpdate(
      authorId,
      toFollow
        ? { $addToSet: { followers: userId } }
        : { $pull: { followers: userId } },
      {
        new: true,
      }
    );
    const user = await User.findByIdAndUpdate(
      userId,
      {
        followers: userProfile?.followers.length,
        following: userProfile?.following.length,
      },
      { new: true }
    );
    await authorToFollow.updateOne({
      followers: authorProfile?.followers.length,
      following: authorProfile?.following.length,
    });

    return res.json({
      status: 'ok', //@ts-ignore
      user: peelUserDoc(user),
    });
  }
);
export const followSchema = yup.object({
  params: yup.object({
    authorId: yup
      .string()
      .label('authorId')
      .typeError('Must be string')
      .required('Author Id is required')
      .test('authorId', 'Author Id must be valid ID.', (val: any) => {
        return typeof val != 'string' ? false : isValidObjectId(val);
      }),
  }),
});
export default [validateSchemaMdlwr(followSchema), followAuthor];
