import { AssetUploadResponse } from '@lib/types/AssetType';
import axios from '../axios';

export const uploadImage = async (file: File): Promise<AssetUploadResponse> => {
  const imageData = new FormData();
  imageData.append('image', file);
  try {
    const {
      data: { result },
    } = await axios.post<AssetUploadResponse>('/assets', imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return { result };
  } catch (err: any) {
    throw err.response.data;
  }
};
