import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { retriveToken } from '../../lib/createToken';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import User from '../../models/User';

// @desc      Reset Pasword
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Auth,Admin

export const resetPasword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = await retriveToken(req.params.resettoken);
    if (token.type != 'resetPassword')
      return next(ErrorResponse(400, 'Resource not found'));

    const user = await User.findById(token.userId);

    if (!user) {
      return next(ErrorResponse(400, 'Resource not found'));
    }
    user.password = req.body.newPassword;
    await user.save();
    await token.delete();
    return res.json({
      status: 'ok',
      message: 'Password changed successfully',
    });
  }
);

export const resetPaswordPage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, 'ResetPassword.html'));
  }
);
