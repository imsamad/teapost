import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../lib/utils";
import Tag from "../../models/Tag";
const getAllTags = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      success: 200,
      tags: await Tag.find({}),
    });
  }
);
export default getAllTags;
