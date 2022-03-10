import { Document, model, Schema } from "mongoose";

export interface TagDocument extends Document {
  tag: String;
}

const tagSchema = new Schema(
  {
    tag: {
      type: String,
      required: [true, "This tag already exist"],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const TagModel = model("Tag", tagSchema);

export default TagModel;
