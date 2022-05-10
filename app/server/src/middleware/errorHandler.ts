import { NextFunction, Request, Response } from 'express';
import { ErrorResponseType } from '../lib/utils';
import 'colors';

const errorHandler = (
  err: ErrorResponseType | any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(
    `*********************************** Error from error middleware *************************`
      .red
  );
  console.log(`${JSON.stringify(err, null, 4)}`.red);
  console.log(
    '*****************************************************************************************'
      .red
  );
  let error = { ...err };
  if (typeof err == 'string') {
    error = {};
    error.message = err;
  } else error.message = err.message;

  // Do some thing if error.mesage include 'call stack exceed'
  if (err.name === 'ValidationError') {
    const inValidFields = Object.keys(err.errors);
    error = {
      message: {
        reason: 'Data are not valid for these fields.',
        fields: inValidFields,
      },
      statusCode: 400,
    };
  }

  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = { message, statusCode: 404 };
  }
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 404 };
  }

  return res.status(error.statusCode || 500).json({
    status: 'error',
    message:
      error.message ||
      'Server is on maintenance right now, soory for delay in service, please try again',
  });
};

export default errorHandler;
