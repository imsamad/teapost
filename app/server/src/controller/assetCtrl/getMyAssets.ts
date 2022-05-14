import { Request, Response, NextFunction } from 'express';
import { getAllImageFromCloudinary } from '../../lib/cloudinary';
import { asyncHandler } from '../../lib/utils';
import Asset from '../../models/Asset';

// @desc      Upload photo
// @route     POST /api/v1/assets/[/ | my]
// @access    Auth

const getMeAssets = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  // let assets = await Asset.findById(req.user._id).lean();
  let original = await getAllImageFromCloudinary();
  res.status(200).json({ original });
});

// export default getAllImagesFromCloudinary;
export default getMeAssets;
