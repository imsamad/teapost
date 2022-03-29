import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../lib/utils";
import User from "../../models/User";

// @desc      forgetEmail
// @route     GET /api/v1/auth/forgetemail
// @access    Auth,Admin,Public

const forgetEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find({
      email: new RegExp(req.body.email, "gi"),
    });
    res.json({
      status: "ok",
      emails: users.map(({ email }) => email),
    });
  }
);

export default forgetEmail;
