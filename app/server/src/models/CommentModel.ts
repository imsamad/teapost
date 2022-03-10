import { Document, model, Schema, Types } from "mongoose";
import { StoryDocument } from "./StoryModel";

import { UserDocument } from "./UserModel";

export interface CommentDocument extends Document {
  isPrimary: boolean;
  user: UserDocument["_id"];
  story: StoryDocument["_id"];
  text: number;
  replyTo?: CommentDocument["_id"];
}

const commentSchema = new Schema(
  {
    isPrimary: Boolean,
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "Author of comment is required."],
      ref: "User",
    },
    story: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },
    text: {
      type: String,
      min: [0, "Enter some thing"],
    },
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const StoryModel = model<StoryDocument>("Comment", commentSchema);

export default StoryModel;
