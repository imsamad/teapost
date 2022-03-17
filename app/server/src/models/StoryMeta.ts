import { Document, model, Schema, Types } from "mongoose";
import { StoryDocument } from "./Story";
import { UserDocument } from "./User";

export interface StoryMetaDocument extends Document {
  _id: StoryDocument["_id"];
  views: number;
  comments: number;
  likedBy: Types.Array<UserDocument["_id"]>;
  dislikedBy: Types.Array<UserDocument["_id"]>;
}

const storyMetaSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    likedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      ],
      select: !false,
    },
    dislikedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      ],
      select: !false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
storyMetaSchema.virtual("like").get(function () {
  // @ts-ignore
  const storyMeta = this as StoryMetaDocument;
  return storyMeta.likedBy.length;
});
storyMetaSchema.virtual("dislike").get(function () {
  // @ts-ignore
  const storyMeta = this as StoryMetaDocument;
  return storyMeta.dislikedBy.length;
});
const StoryMetaModel = model("StoryMeta", storyMetaSchema);

export default StoryMetaModel;
