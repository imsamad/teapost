import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import StoryCollection from "../../models/StoryCollection";

// @desc      Create Collection
// @route     POST /api/v1/collection
// @access    Auth
const createCollection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //   @ts-ignore
    const user = req.user._id;
    const isExist = await StoryCollection.find({
      title: new RegExp("^" + req.body.title + "$", "i"),
      user,
    });
    if (isExist.length)
      return next(
        ErrorResponse(400, `Already exist with title ${req.body.title}`)
      );

    const collection = await StoryCollection.create({
      user,
      ...req.body,
    });
    return res.json({ status: "ok", collection });
  }
);
export default createCollection;
