import { Request, Response, NextFunction } from 'express';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import User from '../../models/User';

const deleteMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //   @ts-ignore
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(ErrorResponse(404, 'No user found'));
    }
    await user.remove();
    return res.status(200).json({
      success: 200,
      message: 'Your account has been deleted',
    });
  }
);

export default deleteMe;
