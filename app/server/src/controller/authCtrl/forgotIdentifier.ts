import { Request, Response, NextFunction } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import User from "../../models/User";

// @desc      forgetEmail
// @route     GET /api/v1/auth/forgotIdentifier
// @access    Public
const forgotIdentifier = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { identifierInitials } = req.body;
    const filter =
      process.env.ONLY_VERIFIED_ALLOWED == "true"
        ? {
            isEmailVerified: true,
            isAuthorised: true,
          }
        : {};

    let users = await User.find({
      $or: [
        { email: new RegExp(identifierInitials, "gi") },
        { username: new RegExp(identifierInitials, "gi") },
      ],
      ...filter,
    });
    if (!users.length) {
      return next(
        ErrorResponse(400, {
          identifierInitials: `No match found`,
        })
      );
    }

    let matchedIdentifiers: string[] = [];
    users.forEach(({ email, username }) => {
      if (email.match(new RegExp(identifierInitials, "gi")))
        matchedIdentifiers.push(email);
      if (username.match(new RegExp(identifierInitials, "gi")))
        matchedIdentifiers.push(username);
    });

    if (!matchedIdentifiers.length) {
      return next(
        ErrorResponse(400, {
          identifierInitials: `No match found`,
        })
      );
    }

    res.json({
      status: "ok",
      matchedIdentifiers,
    });
  }
);

export default forgotIdentifier;
