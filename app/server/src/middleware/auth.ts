import { NextFunction, Request, Response } from "express";
import { decodeJwt } from "../lib/jwt";
import { ErrorResponse } from "../lib/utils";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log('req.headers ', req.headers);
  let token: any;
  if (req.headers?.authorization?.startsWith("Bearer "))
    token = req.headers.authorization.split(" ")[1];

  // console.log('first ', token);
  if (!token)
    return next(ErrorResponse(400, `Not authorized to access this route one`));

  // this is user info
  token = decodeJwt(token);
  if (!token)
    return next(ErrorResponse(400, `Not authorized to access this route two`));

  // @ts-ignore
  req.user = token.user;
  next();
};
