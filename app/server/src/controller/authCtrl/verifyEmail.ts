import { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../../lib/utils";
import User from "../../models/User";
import { ErrorResponse, createHash } from "../../lib/utils";
import { decodeJwt } from "../../lib/jwt";
import Token from "../../models/Token";

const verifyEmail = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const jwtCodedToken: string = req.query.token as string;

    const malliciousReq = ErrorResponse(400, "Mallicious request.");

    if (!jwtCodedToken) return next(malliciousReq);

    const { token: decodedVerifyToken }: any = decodeJwt(
      jwtCodedToken,
      {},
      process.env.JWT_VERIFY_SECRET as string
    );

    if (!decodedVerifyToken) return next(malliciousReq);

    const hashedVerifyToken = createHash(decodedVerifyToken);

    let token = await Token.findOne({
      emailVerifyToken: hashedVerifyToken,
    });

    if (!token) return next(malliciousReq);

    const userId = token.userId;

    const user = await User.findById(userId);

    if (!user) return next(malliciousReq);

    user.isEmailVerified = true;

    await user.save();
    await token.delete();

    res.status(200).json({
      status: "ok",
      message: "Email verfied successfully.",
    });
  }
);
export default verifyEmail;
