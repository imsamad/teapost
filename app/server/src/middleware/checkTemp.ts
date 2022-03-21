import { NextFunction, Request, Response } from "express";

const checkTemp =
  (msg = "I Run") =>
  (_req: Request, _res: Response, next: NextFunction) => {
    console.log("===========================");
    // console.log("typeof ", _req.files.constructor);
    console.log("req from checkTemp ", _req.files);
    console.log("///////////////////////////");

    next();
  };

export default checkTemp;
