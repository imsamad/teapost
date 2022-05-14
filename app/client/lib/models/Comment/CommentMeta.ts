import mongoose, { Document, model, Schema, Types } from 'mongoose';

import { UserDocument } from '../User';
import { CommentMeta as CommentMetaType } from '../../types/CommentTypes';
import { PrimaryCommentDocument } from './Primary';
import { SecondaryCommentDocument } from './Secondary';

export interface CommentMetaDocument
  extends Document,
    Omit<CommentMetaType, '_id' | 'likedBy' | 'dislikedBy'> {
  //
  _id: PrimaryCommentDocument['_id'] | SecondaryCommentDocument['_id'];
  likedBy: Types.Array<UserDocument['_id']>;
  dislikedBy: Types.Array<UserDocument['_id']>;
}

const commentMetaSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, 'Comment is required.'],
      ref: 'Primary',
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dislikedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const CommentMeta =
  mongoose.models?.CommentMeta ||
  mongoose.model<CommentMetaDocument>('CommentMeta', commentMetaSchema);

export default CommentMeta;
