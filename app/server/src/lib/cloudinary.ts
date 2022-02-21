import cloudinaryDef from 'cloudinary';
const cloudinary = cloudinaryDef.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImageToCloudinary = async (data: any) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(data, {
      upload_preset: 'custom_upload_preset',
    });
    return { ...uploadResponse, result: true };
  } catch (err) {
    console.log('error from uploadImageToCloudinary');
    return { err, result: false };
  }
};

export const getAllImageFromCloudinary = async () => {
  try {
    // const { resources } = await cloudinary.search
    //   .expression('folder:custom_upload_preset')
    //   .sort_by('public_id', 'desc')
    //   .max_results(30)
    //   .execute();
    const resources = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'custom_upload_preset',
    });
    // return { uploadResponse, result: true };
    console.log('resources ', resources);
  } catch (err) {
    console.log('err from getAllImageFromCloudinary ', err);
    // return err;
  }
};
