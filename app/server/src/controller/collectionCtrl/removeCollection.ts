import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import StoryCollection from "../../models/StoryCollection";

// @desc      Delete collection
// @route     DELETE /api/v1/collection/:collectionId
// @access    Auth
const removeCollection = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id.toString();
    const collection = await StoryCollection.findOneAndDelete({
      _id: req.params.collectionId,
      user,
    });
    // // // @ts-ignore
    // // if (collection?.title.toLowerCase() == "read later")
    // //   return next(ErrorResponse(402, "Read more cannot be removed"));
    // if (!collection || collection?.user.toString() != user)
    //   return next(ErrorResponse(400, "Resource not found."));
    // await collection.delete();

    return res.json({
      status: "ok",
      message: "Deleted",
    });
  }
);
export default removeCollection;
