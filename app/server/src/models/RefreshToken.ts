import mongoose, { Date, Document, Schema } from "mongoose";
import { UserDocument } from "./User";

export interface RefreshTokenDocument extends Document {
  userId: UserDocument["_id"];
  token: String;
  createdAt: Date;
  updatedAt: Date;
  timsestamp_ms: number;
}

const refreshTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

refreshTokenSchema.post(
  "save",
  function (error: any, doc: RefreshTokenDocument, next: any) {
    if (error?.code === 11000) {
      next("Duplicated");
    } else {
      next(error);
    }
  }
);

refreshTokenSchema.virtual("timsestamp_ms").get(function (this: UserDocument) {
  let createdYear: any = this.updatedAt;
  createdYear = Date.parse(createdYear);
  return createdYear;
});

const RefreshToken = mongoose.model<RefreshTokenDocument>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshToken;
