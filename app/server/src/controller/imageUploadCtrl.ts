import { Request, Response, NextFunction } from 'express';
import { uploadImageToCloudinary } from '../lib/cloudinary';
import { asyncHandler, ErrorResponse } from '../lib/utils';

// @desc      Upload photo
// @route     POST /api/v1/image/upload
// @access    Auth [Reader]
export const imageUpload = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const imageStr = req.body.image;

    if (!imageStr) return next(ErrorResponse(400, 'Provide image'));

    const response: any = await uploadImageToCloudinary(imageStr);

    if (!response.result) {
      return next(ErrorResponse(400, 'Unable to upload Image'));
    }

    res
      .status(200)
      .json({ success: true, data: { imageUrl: response.uploadResponse.url } });
  }
);
