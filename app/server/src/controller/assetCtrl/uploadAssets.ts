import { Request, Response, NextFunction } from 'express';

import path from 'path';
import { uploadImageToCloudinary } from '../../lib/cloudinary';
import { asyncHandler, ErrorResponse } from '../../lib/utils';
import Asset, { FileType } from '../../models/Asset';

// @desc      Upload photo
// @route     POST /api/v1/assets/upload
// @access    Auth
const uploadAssets = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const filesKeys = Object.keys(req.files);

    if (!req?.files || filesKeys.length > 1)
      return next(ErrorResponse(400, 'Only single file allowed to upload'));

    // @ts-ignore
    const limitFileSize = parseInt(process.env.LIMIT_FILE_SIZE, 10);

    const file = Array.isArray(req.files[filesKeys[0]])
      ? // @ts-ignore
        req.files[filesKeys[0]][0]
      : req.files[filesKeys[0]];
    // @ts-ignore
    if (!file.size > limitFileSize)
      return next(
        ErrorResponse(400, `File must be of less than ${limitFileSize} bytes`)
      );

    const resource_type = file.mimetype.includes('video')
      ? 'video'
      : file.mimetype.includes('image')
      ? 'image'
      : 'raw';

    const publicId = path.parse(file.name).name;

    // @ts-ignore
    const response = await uploadImageToCloudinary(
      file?.tempFilePath,
      publicId,
      resource_type
    );

    let assetUploaded = {
      public_id: response.public_id,
      src: response.secure_url,
      url: response.secure_url,
      tags: response.tags,
    };
    // @ts-ignore
    const user = req.user._id;

    await Asset.findByIdAndUpdate(
      user,
      {
        _id: user,
        $push: { [resource_type + 's']: assetUploaded },
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ result: [assetUploaded] });
  }
);
const uploadAssetsTwo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const filesKeys = Object.keys(req.files);

    if (!req?.files || !filesKeys.length)
      return next(ErrorResponse(400, 'Provide data'));

    // @ts-ignore
    const limitFileSize = parseInt(process.env.LIMIT_FILE_SIZE, 10);
    const allFiles: any = filesKeys.map((key) =>
      // @ts-ignore
      Array.isArray(req.files[key]) ? req.files[key] : [req.files[key]]
    );

    if (allFiles.length > 4) return next(ErrorResponse(400, 'Provide data'));

    if (!allFiles.every((file: any) => file.size > limitFileSize))
      return next(
        ErrorResponse(
          400,
          `Every data must be of less than ${limitFileSize} bytes`
        )
      );

    let uploaders = allFiles.map((file: any) => {
      const resource_type = file.mimetype.includes('video')
        ? 'video'
        : file.mimetype.includes('image')
        ? 'image'
        : 'raw';

      const publicId = path.parse(file.name).name;

      // @ts-ignore
      return uploadImageToCloudinary(
        file?.tempFilePath,
        publicId,
        resource_type
      );
    });
    if (!uploaders.length)
      return next(
        ErrorResponse(400, `Files size exceeded ${limitFileSize} bytes`)
      );

    const responses = await Promise.allSettled(uploaders);
    let assetUploaded: Partial<{
      images: FileType[];
      videos: FileType[];
      raws: FileType[];
    }> = {};

    let isAllFailed = true;

    responses.forEach((response) => {
      if (response.status == 'fulfilled') {
        isAllFailed = false;
        const resource_type = response.value.resource_type + 's';
        // @ts-ignore
        if (!assetUploaded[resource_type]) assetUploaded[resource_type] = [];
        // @ts-ignore
        assetUploaded[resource_type].push({
          public_id: response.value.public_id,
          url: response.value.secure_url,
          tags: response.value.tags,
        });
      }
    });
    if (isAllFailed) return next(ErrorResponse(400, 'Invalid files format.'));
    // @ts-ignore
    const user = req.user._id;

    let assetInstane: any = { $push: {} };

    if (assetUploaded.images) assetInstane.$push.images = assetUploaded.images;
    if (assetUploaded.videos) assetInstane.$push.videos = assetUploaded.videos;
    if (assetUploaded.raws) assetInstane.$push.raws = assetUploaded.raws;

    const saved = await Asset.findByIdAndUpdate(
      user,
      {
        _id: user,
        ...assetInstane,
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ assetUploaded });
  }
);
const uploadMultipleDiffTypesAssets = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req?.files?.data) return next(ErrorResponse(400, 'Provide data'));

    const data = Array.isArray(req.files?.data)
      ? req.files?.data
      : [req.files?.data];

    // @ts-ignore
    const limitFileSize = parseInt(process.env.LIMIT_FILE_SIZE, 10);

    let uploaders = data
      .filter((file) => file?.size < limitFileSize)
      .map((file) => {
        const resource_type = file.mimetype.includes('video')
          ? 'video'
          : file.mimetype.includes('image')
          ? 'image'
          : 'raw';

        const publicId = path.parse(file.name).name;

        // @ts-ignore
        return uploadImageToCloudinary(
          file?.tempFilePath,
          publicId,
          resource_type
        );
      });
    if (!uploaders.length)
      return next(
        ErrorResponse(400, `Files size exceeded ${limitFileSize} bytes`)
      );

    const responses = await Promise.allSettled(uploaders);
    let assetUploaded: Partial<{
      images: FileType[];
      videos: FileType[];
      raws: FileType[];
    }> = {};

    let isAllFailed = true;

    responses.forEach((response) => {
      if (response.status == 'fulfilled') {
        isAllFailed = false;
        const resource_type = response.value.resource_type + 's';
        // @ts-ignore
        if (!assetUploaded[resource_type]) assetUploaded[resource_type] = [];
        // @ts-ignore
        assetUploaded[resource_type].push({
          public_id: response.value.public_id,
          url: response.value.secure_url,
          tags: response.value.tags,
        });
      }
    });
    if (isAllFailed) return next(ErrorResponse(400, 'Invalid files format.'));
    // @ts-ignore
    const user = req.user._id;

    let assetInstane: any = { $push: {} };

    if (assetUploaded.images) assetInstane.$push.images = assetUploaded.images;
    if (assetUploaded.videos) assetInstane.$push.videos = assetUploaded.videos;
    if (assetUploaded.raws) assetInstane.$push.raws = assetUploaded.raws;

    const saved = await Asset.findByIdAndUpdate(
      user,
      {
        _id: user,
        ...assetInstane,
      },
      { upsert: true, new: true }
    );

    return res.status(200).json({ assetUploaded });
  }
);
export default uploadAssets;
