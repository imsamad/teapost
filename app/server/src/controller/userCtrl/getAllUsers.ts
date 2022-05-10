import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../lib/utils';
import User, { peelUserDoc } from '../../models/User';
// @desc      getAllUsers
// @route     GET /api/v1/users
// @access    Public

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const page = parseInt(req?.query?.page || 1, 10) || 1,
      // @ts-ignore
      limit = parseInt(req?.query?.limit || 10, 10) || 10;
    // @ts-ignore
    const startIndex = (page - 1) * limit;
    const usersDoc = await User.find({
      isEmailVerified: true,
      isAuthorised: true,
    })
      .populate('profile')
      .skip(startIndex)
      .limit(limit);
    // .lean();

    let pagination: any = { limit };

    if (usersDoc.length) {
      pagination.next = page + 1;
    }
    if (startIndex > 0) pagination.prev = page - 1;
    // @ts-ignore
    const isAdmin = req?.user?.role == 'admin';
    res.json({
      status: 'ok',
      users: isAdmin ? usersDoc : usersDoc.map((user) => peelUserDoc(user)),
    });
  }
);

export default getAllUsers;
