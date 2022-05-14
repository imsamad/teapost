import mongoose, { Document, model, Schema, Types } from 'mongoose';
import { StoryDocument } from './Story';
import { UserDocument } from './User';

export interface StoryMetaDocument extends Document {
  _id: StoryDocument['_id'];
  likedBy: Types.Array<UserDocument['_id']>;
  dislikedBy: Types.Array<UserDocument['_id']>;
}

const storyMetaSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Story',
    },
    likedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
      ],
      select: !false,
    },
    dislikedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User',
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
const StoryMetaModel =
  mongoose.models?.StoryMeta || mongoose.model('StoryMeta', storyMetaSchema);

export default StoryMetaModel;
