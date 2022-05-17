import { Schema, model, Types, Document } from 'mongoose';
import { FileType } from '../lib/types/AssetType';

export interface AssetDocument extends Document {
  images: Types.Array<FileType>;
  videos: Types.Array<FileType>;
  raws: Types.Array<FileType>;
  audios: Types.Array<FileType>;
}

const SingleFile = {
  src: { type: String, require: [true, 'Asset Url is required.'] },
  tags: [String],
  public_id: String,
};
const assetSchema = new Schema({
  _id: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: [SingleFile],
  videos: [SingleFile],
  raws: [SingleFile],
  audios: [SingleFile],
});

const Asset = model<AssetDocument>('Asset', assetSchema);

export default Asset;
