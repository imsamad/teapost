import { NextFunction, Request, Response } from "express";
import { decodeJwt } from "../lib/jwt";
import { ErrorResponse } from "../lib/utils";
import User from "../models/User";
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: any;
  if (req.headers?.authorization?.startsWith("Bearer "))
    token = req.headers.authorization.split(" ")[1];

  if (!token)
    return next(ErrorResponse(400, `Not authorized to access this route one`));

  // this is user info
  token = decodeJwt(token);
  if (!token)
    return next(ErrorResponse(400, `Not authorized to access this route.`));

  const user = await User.findById(token.user).lean();

  const isAllowed = process.env.ONLY_VERIFIED_ALLOWED == "true";
  if (!user)
    return next(ErrorResponse(400, `Not authorized to access this route.`));
  if (isAllowed && (!user?.isAuthorised || !user?.isEmailVerified))
    return next(ErrorResponse(400, `Not authorized to access this route.`));
  // @ts-ignore
  req.user = user;
  next();
};
export const fetchAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: any = false;
  if (req.headers?.authorization?.startsWith("Bearer "))
    token = req.headers.authorization.split(" ")?.[1];

  if (!token || token == "undefined") return next();

  // this is user info
  token = decodeJwt(token);
  if (!token) return next();
  const user = await User.findById(token.user).lean();
  if (!user) return next();

  const isAllowed = process.env.ONLY_VERIFIED_ALLOWED == "true";
  if (isAllowed && (!user?.isAuthorised || !user?.isEmailVerified))
    return next();
  // @ts-ignore
  req.user = user;
  next();
};
export const authorise = (roles: ("admin" | "reader" | "author")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!roles.includes(req.user.role))
      return next(ErrorResponse(400, `Not authorized to access this route`));

    next();
  };
};
