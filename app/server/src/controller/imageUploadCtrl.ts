import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import { uploadImageToCloudinary } from '../lib/cloudinary';
import { asyncHandler, ErrorResponse, saveImageLocally } from '../lib/utils';

// @desc      Upload photo
// @route     POST /api/v1/image/upload
// @access    Auth [Reader]
export const imageUpload = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const file = req.files.image as UploadedFile;

    // const appUrl = `${req.protocol}://${req.get('host')}`;
    // const response: any = await saveImageLocally(file, appUrl);

    const response: any = await uploadImageToCloudinary(file.tempFilePath);

    if (!response.result)
      return next(ErrorResponse(400, 'Unable to upload Image'));

    res.status(200).json({ success: true, data: { imageUrl: response.url } });
  }
);
