import { Schema, model, Document, Types } from "mongoose";

import { StoryDocument } from "./Story";
import { UserDocument } from "./User";
import { StoryCollectionDocument } from "./StoryCollection";
export interface ProfileDocument extends Document {
  id: UserDocument["id"];
  fullName: string;
  likedStories: Types.Array<StoryDocument["_id"]>;
  dislikedStories: Types.Array<StoryDocument["_id"]>;
  following: Types.Array<UserDocument["_id"]>;
  followers: Types.Array<UserDocument["_id"]>;
  storyCollections: Types.Array<StoryCollectionDocument>;
  tagLines: string[];
  profilePic: string;
}

const profileSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required."],
      ref: "User",
    },
    fullName: {
      type: String,
      required: true,
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
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    tagLines: [String],
    profilePic: String,
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

profileSchema.virtual("storyCollections", {
  ref: "StoryCollection",
  localField: "_id",
  foreignField: "user",
  justOne: false,
});

const Profile = model<ProfileDocument>("Profile", profileSchema);

export default Profile;
