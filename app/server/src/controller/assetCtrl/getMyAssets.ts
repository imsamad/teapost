import { Request, Response } from 'express';
import { getAllImageFromCloudinary } from '../../lib/cloudinary';
import { asyncHandler } from '../../lib/utils';
import Asset from '../../models/Asset';

// @desc      Upload photo
// @route     POST /api/v1/assets/[/ | my]
// @access    Auth

const getMyAssets = asyncHandler(async (req: Request, res: Response) => {
  // @ts-ignore
  let assets = await Asset.findById(req.user._id).lean();
  // let original = await getAllImageFromCloudinary();
  const type = req.originalUrl.split('/').pop();
  console.log('type ', type);
  const allowedTypes = ['images', 'videos', 'raws', 'audios'];
  if (type && allowedTypes.includes(type)) {
    // @ts-ignore
    return res.json({ result: assets?.[type] || [] });
  }
  res.status(200).json({ assets: assets || {} });
});

// export default getAllImagesFromCloudinary;
export default getMyAssets;
