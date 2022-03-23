import { Schema, model, Types, Document } from "mongoose";

interface ImageDocument extends Document {
  urls: string[];
}

const imageschema = new Schema({
  _id: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  urls: [String],
});

const Image = model<ImageDocument>("Image", imageschema);

export default Image;
