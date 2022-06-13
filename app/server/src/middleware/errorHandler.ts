import { NextFunction, Request, Response } from 'express';
import { ErrorResponseType, stars } from '../lib/utils';
import 'colors';

const errorHandler = (
  err: ErrorResponseType | any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(`${stars(4)} Error from error middleware ${stars(4)}`.red);
  if (!Object.values(err).length) {
    console.log(err);
  } else console.log(`${JSON.stringify(err, null, 4)}`.red);
  console.log(`${stars(10)}`.red);

  let error = { ...err };
  if (typeof err == 'string') error = { message: err };

  // error.mesage include 'call stack exceed'

  // Mongo Validation Errors
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

  // Mongo CastErrors like invalid _id
  if (err.name === 'CastError') {
    const message = `Resource not found`;
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 404 };
  }

  // Most severe error need to log.
  /**
   * e.g
   * val.split() where val @string
   * but user send val as @object
   */
  if (err.name === 'TypeError') {
    const message = `Invalid data`;
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
