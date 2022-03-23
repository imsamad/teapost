import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import { resolve } from "path";
import { uploadImageToCloudinary } from "../../lib/cloudinary";
import { ImageUrlType } from "../../lib/types/ImageType";
import { asyncHandler, ErrorResponse, saveImageLocally } from "../../lib/utils";
import Image from "../../models/Image";

// @desc      Upload photo
// @route     POST /api/v1/image/upload
// @access    Auth [Reader]
const imageUploadSingle = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.files ", req.files);
    // @ts-ignore
    const file = req.files.image as UploadedFile;

    // const appUrl = `${req.protocol}://${req.get('host')}`;
    // const response: any = await saveImageLocally(file, appUrl);

    let response: any = await uploadImageToCloudinary(file.tempFilePath);

    if (!response.result)
      return next(ErrorResponse(400, "Unable to upload Image"));

    res.status(200).json({ status: "ok", data: { imageUrl: response.url } });
  }
);
const imageUpload = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) return next(ErrorResponse(400, "Provide data"));

    let uploadImages = Object.keys(req.files).map((file) =>
      // @ts-ignore
      uploadImageToCloudinary(req.files?.[file]?.tempFilePath!)
    );

    const response = await Promise.allSettled(uploadImages);
    console.log("response ", response);

    let urls: ImageUrlType[] | (() => Promise<ImageUrlType[]>) = () =>
      new Promise((resolve) => {
        let urls: ImageUrlType[] = []; // @ts-ignore
        response.forEach(({ value: { result, resource } }, index: number) => {
          if (result)
            urls.push({
              url: resource.url,
              id: index,
              caption: resource.url.split("/").pop(),
            });
        });
        if (!urls.length) resolve([]);
        resolve(urls);
      });
    urls = await urls();
    if (!urls.length)
      return res.status(400).json({
        status: "error",
        message: "Unable to Upload please try again",
      });
    // @ts-ignore
    const user = req.user._id;

    await Image.findByIdAndUpdate(
      user,
      {
        _id: user,
        $push: { urls: urls.map(({ url }) => url) },
      },
      { upsert: true, new: true }
    );
    return res.status(200).json({ result: urls });
  }
);
export default imageUpload;
