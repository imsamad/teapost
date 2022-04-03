import { NextFunction, Request, Response } from "express";
import { asyncHandler, ErrorResponse } from "../../lib/utils";
import Primary from "../../models/Comment/Primary";
import Secondary from "../../models/Comment/Secondary";

// @desc      Reply To Primary Comment
// @route     GET /api/v1/comments/reply/primary/:primaryId
// @access    Auth,Admin,Public

// action => replyToPrimary => create Secondary Comment as response
const replyToPrimary = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const primaryComment = await Primary.findById(req.params.primaryId).lean();
    if (!primaryComment) {
      return next(ErrorResponse(400, "Resource not found"));
    }
    const reply = await Secondary.create({
      // @ts-ignore
      user: req.user._id,
      text: req.body.text,
      primary: primaryComment._id.toString(),
    });

    res.json({
      status: "ok",
      reply,
    });
  }
);
export default replyToPrimary;
