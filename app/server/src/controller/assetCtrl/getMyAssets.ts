import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../../lib/utils';
import Asset from '../../models/Asset';

// @desc      Upload photo
// @route     POST /api/v1/assets/[/ | my]
// @access    Auth

const getMeAssets = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  let assets = await Asset.findById(req.user._id).lean();

  res.status(200).json({ assets });
});

// export default getAllImagesFromCloudinary;
export default getMeAssets;
