import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../lib/utils";
import User from "../../models/User";
// @desc      getAllUsers
// @route     GET /api/v1/users
// @access    Public

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const usersDoc = await User.find({}).populate("profile");

    res.json({
      status: "ok",
      users: !usersDoc.length
        ? []
        : usersDoc.map((user) => ({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            followers: user?.profile?.followers?.length || 0,
          })),
    });
  }
);

export default getAllUsers;
