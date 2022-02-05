import { NextFunction, Request, Response } from 'express';
import { ErrorResponseType, typeOf } from '../lib/utils';

const errorHandler = (
  err: ErrorResponseType,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (process.env.NODE_ENV !== 'production')
    console.log('Error from errom middleware ', err);
  let error = { ...err };
  error.message = err.message;

  // Do some thing if error.mesage include 'call stack exceed'

  return res.status(error.statusCode || 500).json({
    success: false,
    error: true,
    message: error.message || 'Server Error',
    status: error.statusCode || 500,
  });
};

export default errorHandler;
