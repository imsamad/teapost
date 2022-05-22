import { NextFunction, Request, Response } from 'express';

const checkTemp =
  (msg = 'I Run') =>
  (_req: Request, _res: Response, next: NextFunction) => {
    console.log('body', _req.body);
    console.log('originalUrl ', _req.originalUrl);
    console.log('params', _req.params);
    console.log('query', _req.query);
    next();
  };

export default checkTemp;
