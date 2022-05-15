import cloudinaryDef from 'cloudinary';
import { nanoid } from 'nanoid';
const cloudinary = cloudinaryDef.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (
  data: any,
  publicId?: string,
  resource_type = 'image'
): Promise<cloudinaryDef.UploadApiResponse> => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(data, {
      resource_type,
      public_id: `${publicId}` || `teapost_${nanoid(5)}`,
      folder: 'teapost',
      tags: [publicId],
    });

    return uploadResponse;
  } catch (err: any) {
    console.log('error from uploadImageToCloudinary', err);
    throw err;
  }
};

export const getAllImageFromCloudinary = async () => {
  try {
    const { resources } = await cloudinary.api.resources({
      all: true,
      type: 'upload',
      max_results: 200,
      prefix: 'avatar',
    });
    console.log('resources.length ', resources.length);
    return { resources: resources, result: true };
  } catch (err) {
    console.log('err from getAllImageFromCloudinary ', err);
    return err;
  }
};
