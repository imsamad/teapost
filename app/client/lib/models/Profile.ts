import mongoose, { Schema, model, Document, Types } from 'mongoose';

import { StoryDocument } from './Story';
import { UserDocument } from './User';
import { StoryCollectionDocument } from './StoryCollection';

export interface ProfileDocument extends Document {
  id: UserDocument['id'];
  likedStories: Types.Array<StoryDocument['_id']>;
  dislikedStories: Types.Array<StoryDocument['_id']>;
  following: Types.Array<UserDocument['_id']>;
  followers: Types.Array<UserDocument['_id']>;
  collabStories: Types.Array<StoryDocument['_id']>;
  storyCollections: Types.Array<StoryCollectionDocument>;
}

const profileSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is required.'],
      ref: 'User',
    },
    likedStories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Story',
      },
    ],
    dislikedStories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Story',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    collabStories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Story',
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

profileSchema.virtual('storyCollections', {
  ref: 'StoryCollection',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

const Profile =
  mongoose.models?.Profile ||
  mongoose.model<ProfileDocument>('Profile', profileSchema);

export default Profile;
