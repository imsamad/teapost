import { NextFunction, Request, Response } from 'express';
import { decodeJwt } from '../lib/jwt';
import { ErrorResponse } from '../lib/utils';
import User from '../models/User';

export async function fetchAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // @ts-ignore
  if (req.user?._id) return next();
  let token: any = false;
  if (req.headers?.authorization?.startsWith('Bearer '))
    token = req.headers.authorization.split(' ')?.[1];

  if (!token || token == 'undefined') return next();

  // this is user info
  token = decodeJwt(token);
  if (!token) return next();
  const user = await User.findById(token.user).lean();
  if (!user) return next();

  if (!user?.isAuthorised || !user?.isEmailVerified) return next();

  // @ts-ignore
  req.user = user;
  next();
}
const assert = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req?.user?._id) next();
  else return next(ErrorResponse(400, `Not authorized to access this route.`));
};

export const protect = [fetchAuth, assert];

export const authorise = (roles: ('admin' | 'reader' | 'author')[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!roles.includes(req.user.role))
      return next(
        ErrorResponse(400, `Not authorized for non-admin to access this route`)
      );

    next();
  };
};
