import cloudinaryDef from "cloudinary";
const cloudinary = cloudinaryDef.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (
  data: any
): Promise<{ resource: cloudinaryDef.UploadApiResponse; result: boolean }> => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(data, {
      upload_preset: "custom_upload_preset",
    });

    return { resource: uploadResponse, result: true };
  } catch (err: any) {
    console.log("error from uploadImageToCloudinary", err);
    return { ...err, result: false };
  }
};

export const getAllImageFromCloudinary = async () => {
  try {
    const { resources } = await cloudinary.api.resources({
      type: "upload",
      prefix: "samples" || "ml_default" || "custom_upload_preset",
    });
    return { resources: resources, result: true };
  } catch (err) {
    console.log("err from getAllImageFromCloudinary ", err);
    return err;
  }
};
