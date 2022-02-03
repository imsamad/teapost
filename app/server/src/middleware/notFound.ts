import { NextFunction, Request, Response } from 'express';

import ErrorResponse from '../utils/ErrorResponse';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(
    ErrorResponse(
      404,
      `Not Found - ${req.protocol}://${req.get('host')}${req.originalUrl}`
    )
  );
};

export default notFound;
