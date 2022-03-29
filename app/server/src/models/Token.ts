import mongoose, { Document, Schema } from "mongoose";

import { UserDocument } from "./User";

export interface TokenDocument extends Document {
  token: String;
  type: "verifyemail" | "resetpassword" | "changeemail";
  userId: UserDocument["_id"];
  tempData: {
    fullName?: string;
    newEmail?: string;
    newUser: boolean;
  };
}

const tokenSchema = new Schema(
  {
    token: { type: String, required: true },
    type: {
      type: String,
      enum: ["verifyemail", "resetpassword", "changeemail"],
    },
    userId: Schema.Types.ObjectId,
    tempData: {
      fullName: String,
      newEmail: String,
      newUser: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// tokenSchema.index(
//   { createdAt: 1 },
//   { expireAfterSeconds: Number(process.env.EXPIRE_TOKEN!) }
// );
const Token = mongoose.model<TokenDocument>("Token", tokenSchema);

export default Token;
