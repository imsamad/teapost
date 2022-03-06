import { Schema, model, Document } from "mongoose";
import { StoryDocument } from "./StoryModel";
import { UserDocument } from "./UserModel";

export interface GradeDocument extends Document {
  user: UserDocument["_id"];
  likeStories: StoryDocument["_id"][];
  dislikeStories: StoryDocument["_id"][];
}

const gradeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required."],
      ref: "User",
      unique: true,
    },
    likeStories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    dislikeStories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const GradeModel = model<GradeDocument>("Grade", gradeSchema);

export default GradeModel;
