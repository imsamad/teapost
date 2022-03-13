import axios from "../axios";

const uploadFile = async (file: Blob) => {
  const imageData = new FormData();
  imageData.append("image", file);
  try {
    // @ts-ignore
    const {
      data: {
        data: { imageUrl },
      },
    } = await axios.post("/image/upload", imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return imageUrl;
  } catch (err) {
    return false;
  }
};

export default uploadFile;
