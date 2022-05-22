import { Request, Response, NextFunction } from 'express';
import pagination from '../../lib/pagination';
import { asyncHandler } from '../../lib/utils';
import User from '../../models/User';

// @desc      getAllUsers
// @route     GET /api/v1/users
// @access    Public
export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    pagination(req, res, {
      query: User.find({
        isEmailVerified: true,
        isAuthorised: true,
      }),
      label: 'users',
    });
  }
);

export default getAllUsers;
