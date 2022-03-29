import { Request, Response, NextFunction } from "express";

import { asyncHandler, sendTokens } from "../../lib/utils";
import User, { UserDocument } from "../../models/User";
import { ErrorResponse } from "../../lib/utils";
import { signJwt } from "../../lib/jwt";

const logIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const filter =
      process.env.ONLY_VERIFIED_ALLOWED == "true"
        ? {
            isEmailVerified: true,
            isAuthorised: true,
          }
        : {};
    let user = await User.findOne({ email, ...filter }).select("+password");

    if (!user)
      return next(
        ErrorResponse(400, { email: "Email not registered/verfied ." })
      );

    const isPwdMatch = await user.matchPassword(password);

    if (!isPwdMatch)
      return next(ErrorResponse(400, { password: "Password is wrong." }));

    if (!user.isAuthorised) return next(ErrorResponse(400, "Not authorised!"));

    user.password = "";
    // delete user?.password;

    sendTokens(user, 200, res);
  }
);

export default logIn;
