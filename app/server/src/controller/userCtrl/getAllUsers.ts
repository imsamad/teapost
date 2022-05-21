import { Request, Response, NextFunction } from 'express';
import pagination from '../../lib/pagination';
import { asyncHandler } from '../../lib/utils';
import User, { peelUserDoc } from '../../models/User';

// @desc      getAllUsers
// @route     GET /api/v1/users
// @access    Public
export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = User.find({
      isEmailVerified: true,
      isAuthorised: true,
    }).populate('profile');

    // @ts-ignore
    const isAdmin = req?.user?.role == 'admin';

    pagination(req, res, {
      query,

      label: 'users',
      cbOnData: (userDoc: any) =>
        isAdmin ? userDoc : userDoc.map((user: any) => peelUserDoc(user)),
    });
  }
);

export default getAllUsers;
