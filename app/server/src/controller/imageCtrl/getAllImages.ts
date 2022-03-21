import { Request, Response, NextFunction } from "express";
import { getAllImageFromCloudinary } from "../../lib/cloudinary";
import { asyncHandler } from "../../lib/utils";

// @desc      Upload photo
// @route     POST /api/v1/image/upload
// @access    Auth [Reader]
const getAllImages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let urls:
      | any
      | [
          {
            src: string;
            thumbnail: string;
            name: string;
            alt: string;
          }
        ] = await getAllImageFromCloudinary();

    urls =
      urls.resources?.length <= 0
        ? []
        : urls.resources.map(({ url }: any, id: number) => ({
            src: url,
            id,
            caption: url.split("/").pop(),
          }));
    res.status(200).json({ result: urls });
  }
);
export default getAllImages;
