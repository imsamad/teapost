import mongoose, { Document, Schema } from "mongoose";

import { UserDocument } from "./User";

export interface TokenDocument extends Document {
  token: String;
  type: "verifyemail" | "resetpassword";
  userId: UserDocument["_id"];
  tempData: {
    isVerifyChangedEmailToken?: boolean;
    newEmail?: string;
  };
}

const tokenSchema = new Schema(
  {
    token: { type: String, required: true },
    type: {
      type: String,
      enum: ["verifyemail", "resetpassword"],
    },
    userId: Schema.Types.ObjectId,
    tempData: {
      isVerifyChangedEmailToken: { type: Boolean, default: false },
      newEmail: String,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: parseInt(process.env.TOKEN_EXPIRE!, 10) }
);
// tokenSchema.on();
const Token = mongoose.model<TokenDocument>("Token", tokenSchema);

export default Token;
