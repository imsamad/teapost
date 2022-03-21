import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import { uploadImageToCloudinary } from "../../lib/cloudinary";
import { asyncHandler, ErrorResponse, saveImageLocally } from "../../lib/utils";

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

    let uploadImages: Promise<any>[] = Object.keys(req.files).map((file) =>
      // @ts-ignore
      uploadImageToCloudinary(req.files[file].tempFilePath)
    );
    Promise.allSettled(uploadImages).then((response) => {
      const urls = response.map((res: any, index: number) => ({
        url: res.value.url,
        id: index,
        caption: res.value.url.split("/").pop(),
      }));
      return res.status(200).json({ result: urls });
    });
    // return next(ErrorResponse(400, "Unable to upload Image"));

    // res.status(200).json({ status: "ok", data: { imageUrl: response.url } });
  }
);
export default imageUpload;
