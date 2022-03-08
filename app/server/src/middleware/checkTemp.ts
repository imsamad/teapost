import { NextFunction, Request, Response } from "express";

const checkTemp =
  (msg = "I Run") =>
  (_req: Request, _res: Response, next: NextFunction) => {
    // console.log(msg);
    console.log("===========================");
    console.log("req from checkTemp ", _req?.headers?.authorization);
    console.log("///////////////////////////");
    // console.log('From checkTemp mdlwr ', _req.body);
    next();
  };

export default checkTemp;
