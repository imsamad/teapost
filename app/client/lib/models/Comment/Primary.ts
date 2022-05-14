import mongoose, { Document, model, Schema } from 'mongoose';
import { StoryDocument } from '../Story';

import { UserDocument } from '../User';
import { PrimaryComment } from '../../types/CommentTypes';
import { CommentMetaDocument } from './CommentMeta';

export interface PrimaryCommentDocument
  extends Document,
    Omit<PrimaryComment, '_id' | 'meta'> {
  //
  user: UserDocument['_id'];
  story: StoryDocument['_id'];
  meta: CommentMetaDocument;
}

const primaryCommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author of comment is required.'],
      ref: 'User',
    },
    story: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Story',
    },
    text: {
      required: true,
      type: String,
      trim: true,
      min: [1, 'Enter some thing'],
    },
    noOfReplies: { type: Number, default: 0 },
    noOfLikes: { type: Number, default: 0 },
    noOfDislikes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

primaryCommentSchema.virtual('secondary', {
  ref: 'Secondary',
  localField: '_id',
  foreignField: 'primary',
  justOne: false,
});

primaryCommentSchema.virtual('meta', {
  ref: 'CommentMeta',
  localField: '_id',
  foreignField: '_id',
  justOne: true,
});

primaryCommentSchema.pre('save', async function (next) {
  if (!this.isNew) return next();
  const update = await this.model('Story').findByIdAndUpdate(
    this.story.toString(),
    {
      _id: this.story.toString(),
      $inc: { noOfComments: 1 },
    },
    { new: true }
  );
  next();
});

primaryCommentSchema.pre('remove', async function (next) {
  await this.model('CommentMeta').findByIdAndRemove(this._id);
  await this.model('Story').findByIdAndUpdate(this.story.toString(), {
    $inc: { noOfComments: -1 },
  });
  let secondaryComments = await this.model('Secondary').find({
    primary: this._id,
  });

  let secondaryCommentsPromise: any = secondaryComments.map((secondary: any) =>
    secondary.remove()
  );

  Promise.allSettled(secondaryCommentsPromise)
    .then((res: any) => {})
    .finally(() => {
      next();
    });
});

const Primary =
  mongoose.models?.Primary ||
  mongoose.model<PrimaryCommentDocument>('Primary', primaryCommentSchema);
export default Primary;
