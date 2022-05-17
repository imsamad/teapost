export interface FileType {
  src: string;
  tags: string[];
  public_id: string;
  url?: string;
}

export interface Asset {
  images: FileType[];
  videos: FileType[];
  raws: FileType[];
}

export interface AssetUploadResponse {
  result: FileType[];
}
