import { NextFunction, Request, Response } from 'express';
import { ErrorResponseType } from '../lib/utils';

const errorHandler = (
  err: ErrorResponseType | any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (process.env.NODE_ENV !== 'production')
    console.log('Error from errom middleware ', JSON.stringify(err, null, 4));
  let error = { ...err };
  error.message = err.message;

  // Do some thing if error.mesage include 'call stack exceed'

  if (err.name === 'ValidationError') {
    console.log('ValidationErrorValidationErrorValidationError');
    error.message = {};
    Object.keys(err.errors).forEach((key: any) => {
      console.log('val', key);
      error.message[key] = err.errors[key].message;
    });
  }

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    status: error.statusCode || 500,
  });
};

export default errorHandler;
