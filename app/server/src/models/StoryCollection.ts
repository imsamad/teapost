import { Schema, model, Document, Types } from "mongoose";

import { StoryDocument } from "./Story";
import { UserDocument } from "./User";

export interface CollectionDocument extends Document {
  user: UserDocument["id"];
  description: string;
  title: string;
  stories: Types.Array<StoryDocument["_id"]>;
  isPublic: boolean;
}

const storyCollectionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required."],
      ref: "User",
    },
    stories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    title: { type: String, dropDups: true },
    description: String,
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

storyCollectionSchema.index({ user: 1, title: 1 }, { unique: true });
storyCollectionSchema.index(
  { title: 1, isPublic: 1 },
  { partialFilterExpression: { isPublic: true }, unique: true }
);

const StoryCollectionModel = model<CollectionDocument>(
  "StoryCollection",
  storyCollectionSchema
);

export default StoryCollectionModel;
