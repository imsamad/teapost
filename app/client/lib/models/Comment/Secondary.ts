import mongoose, { Document, model, Schema } from 'mongoose';

import { UserDocument } from '../User';
import { SecondaryComment as SecondaryCommentType } from '../../types/CommentTypes';
import { CommentMetaDocument } from './CommentMeta';
import { PrimaryCommentDocument } from './Primary';

export interface SecondaryCommentDocument
  extends Document,
    Omit<SecondaryCommentType, '_id' | 'primary' | 'secondary'> {
  //
  user: UserDocument['_id'];
  primary: PrimaryCommentDocument['_id'];
  secondary: SecondaryCommentDocument['_id'];
  meta: CommentMetaDocument;
}

const secondaryCommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author of comment is required.'],
      ref: 'User',
    },
    text: {
      type: String,
      trim: true,
      min: [1, 'Enter some thing'],
    },
    primary: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author of comment is required.'],
      ref: 'Primary',
    },
    secondary: {
      type: Schema.Types.ObjectId,
      ref: 'Secondary',
    },
    secondaryUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    noOfLikes: { type: Number, default: 0 },
    noOfDislikes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

secondaryCommentSchema.virtual('meta', {
  ref: 'CommentMeta',
  localField: '_id',
  foreignField: '_id',
  justOne: true,
});

secondaryCommentSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  const primary = await this.model('Primary').findByIdAndUpdate(
    this.primary.toString(),
    { $inc: { noOfReplies: 1 } }
  );
  await this.model('Story').findByIdAndUpdate(primary.story, {
    $inc: { noOfComments: 1 },
  });
  next();
});

secondaryCommentSchema.pre('remove', async function (next) {
  await this.model('CommentMeta').findByIdAndRemove(this._id);
  const primary = await this.model('Primary').findByIdAndUpdate(
    this.primary.toString(),
    {
      $inc: { noOfReplies: -1 },
    }
  );

  await this.model('Story').findByIdAndUpdate(primary.story, {
    $inc: { noOfComments: -1 },
  });

  next();
});

const Secondary =
  mongoose.models?.Secondary ||
  mongoose.model<SecondaryCommentDocument>('Secondary', secondaryCommentSchema);
export default Secondary;
