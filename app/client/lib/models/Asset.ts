import mongoose, { Schema, model, Types, Document } from 'mongoose';

export interface FileType {
  src: string;
  tags: string[];
  public_id: string;
}

export interface AssetDocument extends Document {
  images: Types.Array<FileType>;
  videos: Types.Array<FileType>;
  raws: Types.Array<FileType>;
}

const SingleFile = {
  src: String,
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
});

const Asset =
  mongoose.models?.Asset || mongoose.model<AssetDocument>('Asset', assetSchema);

export default Asset;
