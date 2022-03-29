import { Request, Response, NextFunction } from "express";
import path from "path";
import { retriveToken } from "../../lib/createToken";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import User from "../../models/User";

// @desc      resetPasword
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Auth,Admin,Public

export const resetPasword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = await retriveToken(
      "resetpassword",
      req.params.resettoken
    );

    const user = await User.findById(token.userId);

    if (!user) {
      return next(ErrorResponse(400, "Resource not found"));
    }
    user.password = req.body.newPassword;
    await user.save();
    await token.delete();
    return res.json({
      status: "ok",
      message: "Password changed successfully",
    });
  }
);

export const resetPaswordPage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "ResetPassword.html"));
  }
);
