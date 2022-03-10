import { Schema, model, Document, Types } from "mongoose";
import { StoryDocument } from "./StoryModel";
import { UserDocument } from "./UserModel";

export interface ProfileDocument extends Document {
  _id: UserDocument["_id"];
  id: UserDocument["_id"];
  likedStories: Types.Array<StoryDocument["_id"]>;
  dislikedStories: Types.Array<StoryDocument["_id"]>;
}

const gradeSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required."],
      ref: "User",
    },
    likedStories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    dislikedStories: [
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

const ProfileModel = model<ProfileDocument>("Profile", gradeSchema);

export default ProfileModel;
