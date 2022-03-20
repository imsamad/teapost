import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../lib/utils";
import Secondary from "../../models/Comment/Secondary";

// @desc      Get comments of secondary of primary
// @route     GET /api/v1/comments/replyof/:primaryId
// @access    Auth,Public,Admin
const getSecondaries = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const comments = await Secondary.find({
      replyToPrimary: req.params.primaryId,
    })
      .populate([
        { path: "meta" },
        {
          path: "user",
          select: "email username",
        },
        {
          path: "replyToSecondaryUser",
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
