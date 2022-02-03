import { NextFunction, Request, Response, Errback } from 'express';
import { ErrorResponseType } from '../utils/ErrorResponse';

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

  return res.status(error.statusCode || 500).json({
    success: false,
    error: true,
    message: error.message || 'Server Error',
    status: error.statusCode || 500,
  });
};

export default errorHandler;
