import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import StoryCollection from "../../models/StoryCollection";

// @desc      Create Collection
// @route     POST /api/v1/collections/:collectionId
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
export default updateCollection;
