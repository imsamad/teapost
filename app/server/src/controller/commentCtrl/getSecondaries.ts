import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../lib/utils";
import Secondary from "../../models/Comment/Secondary";

// @desc      Get comments reply of primary
// @route     GET /api/v1/comments/secondaries/:primaryId
// @access    Public

const getSecondaries = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
      .lean();

    res.json({
      staus: "ok",
      comments,
    });
  }
);
export default getSecondaries;
