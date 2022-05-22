import { NextFunction, Request, Response } from 'express';

const checkTemp =
  (msg = 'I Run') =>
  (_req: Request, _res: Response, next: NextFunction) => {
    console.log('body', _req.params);
    next();
  };

export default checkTemp;
