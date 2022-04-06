import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../lib/utils";
import Secondary from "../../models/Comment/Secondary";

// @desc      Get comments reply of primary
// @route     GET /api/v1/comments/secondaries/:primaryId
// @access    Public

const getSecondaries = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const page = parseInt(req?.query?.page || 1, 10) || 1,
      // @ts-ignore
      limit = parseInt(req?.query?.limit || 10, 10) || 10;
    // @ts-ignore
    const startIndex = (page - 1) * limit,
      endIndex = page * limit;
    const comments = await Secondary.find({
      primary: req.params.primaryId,
    })
      .populate([
        { path: "meta" },
        {
          path: "user",
          select: "email username",
        },
        {
          path: "secondaryUser",
          select: "username email",
        },
      ])
      .skip(startIndex)
      .limit(limit)
      .lean();

    let pagination: any = { limit };
    if (comments.length) {
      pagination.next = page + 1;
    }
    if (startIndex > 0) pagination.prev = page - 1;
    res.json({
      staus: "ok",
      comments,
    });
  }
);
export default getSecondaries;
