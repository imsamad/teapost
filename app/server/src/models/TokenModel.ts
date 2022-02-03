import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './UserModel';

export interface TokenDocument extends Document {
  userId: UserDocument['_id'];
  emailVerifyToken: String;
}

const tokenSchema = new Schema(
  {
    emailVerifyToken: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Token = mongoose.model<TokenDocument>('Token', tokenSchema);

export default Token;
