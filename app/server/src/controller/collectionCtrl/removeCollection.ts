import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import StoryCollection from "../../models/StoryCollection";

// @desc      Delete collection
// @route     DELETE /api/v1/collection/:collectionId
// @access    Auth,Public,Admin
const removeCollection = asyncHandler(
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
export default removeCollection;
