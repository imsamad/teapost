import { NextFunction, Request, Response } from 'express';
import { decodeJwt } from '../lib/jwt';
import { ErrorResponse } from '../lib/utils';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token: any;
  if (req.headers?.authorization?.startsWith('Bearer '))
    token = req.headers.authorization.split(' ')[1];

  if (!token)
    return next(ErrorResponse(400, `Not authorized to access this route`));

  // this is user info
  token = decodeJwt(token);

  if (!token)
    return next(ErrorResponse(400, `Not authorized to access this route`));

  // @ts-ignore
  req.user = token.userId;
  next();
};
