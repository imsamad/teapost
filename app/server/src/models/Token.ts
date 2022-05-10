import mongoose, { Document, Schema } from 'mongoose';
import ms from 'ms';

import { UserDocument } from './User';

export interface TokenDocument extends Document {
  token: String;
  type: 'resetPassword' | 'verifyRegistration' | 'verifyChangedEmail';
  userId: UserDocument['_id'];

  newEmail?: string;
}

const tokenSchema = new Schema(
  {
    token: { type: String, required: true },
    type: {
      type: String,
      enum: ['verifyRegistration', 'verifyChangedEmail', 'resetPassword'],
    },
    userId: Schema.Types.ObjectId,
    newEmail: String,
    // createdAt: { type: Date, expires: 60, default: Date.now },
  },
  {
    timestamps: true,
  }
);

tokenSchema.index(
  { createdAt: 1 }, //@ts-ignore
  { expireAfterSeconds: ms(process.env.TOKEN_EXPIRE) }
);

const Token = mongoose.model<TokenDocument>('Token', tokenSchema);

export default Token;
