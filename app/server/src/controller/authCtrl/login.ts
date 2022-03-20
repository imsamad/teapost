import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../../lib/utils";
import User, { UserDocument } from "../../models/User";
import { ErrorResponse } from "../../lib/utils";
import { signJwt } from "../../lib/jwt";

const logIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user)
      return next(ErrorResponse(400, { email: "Email not registered." }));

    const isPwdMatch = await user.matchPassword(password);

    if (!isPwdMatch)
      return next(ErrorResponse(400, { password: "Password is wrong." }));

    if (!user.isAuthorised) return next(ErrorResponse(400, "Not authorised!"));

    user.password = "";
    // delete user?.password;

    sendTokens(user, 200, res);
  }
);

const sendTokens = async (
  user: UserDocument,
  statusCode: number,
  res: Response
) => {
  const resData = {
    status: "ok",
    user: {
      _id: user._id,
      email: user.email,
      accessToken: signJwt(
        { user: user._id },
        {
          expiresIn: "7d",
        }
      ),
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
    },
  };

  return res.status(statusCode).json(resData);
};

export default logIn;
