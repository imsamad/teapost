import { Document, model, Schema } from "mongoose";

import { UserDocument } from "../User";
import { SecondaryComment as SecondaryCommentType } from "../../lib/types/CommentTypes";
import { CommentMetaDocument } from "./CommentMeta";
import { PrimaryCommentDocument } from "./Primary";

export interface SecondaryCommentDocument
  extends Document,
    Omit<SecondaryCommentType, "_id" | "replyToPrimary" | "replyToSecondary"> {
  //
  user: UserDocument["_id"];
  replyToPrimary: PrimaryCommentDocument["_id"];
  replyToSecondary: SecondaryCommentDocument["_id"];
  meta: CommentMetaDocument;
}

const secondaryCommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "Author of comment is required."],
      ref: "User",
    },
    replyToSecondaryUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    replyToSecondary: {
      type: Schema.Types.ObjectId,
      ref: "Secondary",
    },
    replyToPrimary: {
      type: Schema.Types.ObjectId,
      required: [true, "Author of comment is required."],
      ref: "Primary",
    },
    text: {
      type: String,
      min: [0, "Enter some thing"],
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
secondaryCommentSchema.virtual("tertiary", {
  ref: "Secondary",
  localField: "_id",
  foreignField: "replyToPrimary",
  justOne: false,
});

secondaryCommentSchema.virtual("meta", {
  ref: "CommentMeta",
  localField: "_id",
  foreignField: "_id",
  justOne: true,
});

secondaryCommentSchema.pre("remove", async function (next) {
  const deleteCommentMeta = await this.model("CommentMeta").findByIdAndRemove(
    this._id
  );

  next();
});
const Secondary = model<SecondaryCommentDocument>(
  "Secondary",
  secondaryCommentSchema
);
export default Secondary;
