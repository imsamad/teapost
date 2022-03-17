import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorResponse } from "../lib/utils";
import StoryCollection from "../models/StoryCollection";

// @desc      Create Collection
// @route     POST /api/v1/collection
// @access    Auth
export const createCollection = asyncHandler(
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

// @desc      Create Collection
// @route     POST /api/v1/collection/:collectionId
// @access    Auth
export const updateCollection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    //   @ts-ignore
    const user = req.user._id;
    let collection = await StoryCollection.findOne({
      _id: req.params.collectionId,
      user,
    });
    if (!collection) return next(ErrorResponse(404, "Resource not found"));
    collection.isPublic = req.body?.isPublic || collection.isPublic;
    collection.title = req.body?.title || collection.title;
    collection.description = req.body?.description || collection.description;
    collection.stories = req.body?.stories || collection.stories;
    collection = await collection.save();
    return res.json({ status: "ok", collection });
  }
);

// @desc      Delete collection
// @route     DELETE /api/v1/collection/:collectionId
// @access    Auth,Public,Admin
export const removeCollection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const collection = await StoryCollection.findOne({
      _id: req.params.collectionId,
      // @ts-ignore
      user: req.user,
    });
    // @ts-ignore
    if (collection?.title.toLowerCase() == "read later")
      return next(ErrorResponse(402, "Read more cannot be removed"));
    if (!collection) return next(ErrorResponse(400, "Resource not found."));
    await collection.delete();

    return res.json({
      status: "ok",
      message: "Deleted",
    });
  }
);
