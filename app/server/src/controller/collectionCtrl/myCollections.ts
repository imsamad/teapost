import { Request, Response, NextFunction } from "express";
import { asyncHandler, peelUserDoc } from "../../lib/utils";
import StoryCollection from "../../models/StoryCollection";

// @desc      myCollections
// @route     GET /api/v1/collections/my
// @access    Auth

const myCollections = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const user = req.user._id;
    // @ts-ignore
    const page = parseInt(req.query.page) || 1,
      // @ts-ignore
      limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit,
      endIndex = page * limit;

    const mycollections = await StoryCollection.find(
      {
        user,
      },
      { stories: { $slice: [0, 10] } }
    )
      .skip(startIndex)
      .limit(endIndex);
    // .populate([
    //   {
    //     path: "stories",
    //     select: "-content",
    //     populate: { path: "author", transform: (v) => peelUserDoc(v) },
    //   },
    // ])
    // .lean();
    let pagination: any = { limit };
    if (mycollections.length) {
      pagination.next = page + 1;
    }
    if (startIndex > 0) pagination.prev = page - 1;

    res.json({ status: "ok", mycollections, pagination });
  }
);

export default myCollections;
