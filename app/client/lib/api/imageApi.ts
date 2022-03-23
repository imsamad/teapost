import { ImageUrlType } from "@lib/types/ImageType";
import axios from "../axios";

export const uploadImage = async (
  file: File
): Promise<{ result: ImageUrlType[] }> => {
  const imageData = new FormData();
  imageData.append("image", file);
  try {
    const {
      data: { result },
    } = await axios.post<{ result: ImageUrlType[] }>(
      "/image/upload",
      imageData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { result };
  } catch (err: any) {
    throw err.response.data;
  }
};
export const getAllImages = async (): Promise<{ result: ImageUrlType[] }> => {
  try {
    const {
      data: { result },
    } = await axios.get<{ result: ImageUrlType[] }>("/image");
    return { result };
  } catch (err: any) {
    return err;
  }
};
