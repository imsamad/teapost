import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../lib/utils";
import Tag from "../models/Tag";

export const getAllTags = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allTags = await Tag.find({});
    return res.status(200).json({
      success: 200,
      data: allTags,
    });
  }
);
