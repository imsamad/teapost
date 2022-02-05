import { NextFunction, Request, Response } from 'express';

import crypto from 'crypto';
export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const randomBytes = (num = 20) =>
  crypto.randomBytes(num).toString('hex');

export const createHash = (str: string) =>
  crypto.createHash('sha256').update(str).digest('hex');

export const typeOf = (
  val: any,
  type: string | 'string' | 'array' | 'object'
) => val.constructor.name.toLowerCase() === type.toLowerCase();

export const trimExtra = (str: string | any, length: number): boolean => {
  if (!str) return false;
  let splitted = str.split(' ');
  let filtered = splitted.filter((val: string) => val !== '');
  let joined = filtered.join(' ');
  return joined.length > length ? true : false;
};

export type ErrorResponseType = {
  statusCode: number;
  message: string | string[] | {};
};

export const ErrorResponse = (
  statusCode: number,
  message: string | string[] | {}
): ErrorResponseType => {
  return { statusCode, message };
};
