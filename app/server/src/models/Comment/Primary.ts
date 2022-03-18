import { Document, model, Schema } from "mongoose";
import { StoryDocument } from "../Story";

import { UserDocument } from "../User";
import { PrimaryComment } from "../../lib/types/CommentTypes";
import { CommentMetaDocument } from "./CommentMeta";

export interface PrimaryCommentDocument
  extends Document,
    Omit<PrimaryComment, "_id" | "meta"> {
  //
  user: UserDocument["_id"];
  story: StoryDocument["_id"];
  meta: CommentMetaDocument;
}
const primaryCommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "Author of comment is required."],
      ref: "User",
    },
    story: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Story",
    },
    text: {
      required: true,
      type: String,
      min: [1, "Enter some thing"],
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

primaryCommentSchema.virtual("secondary", {
  ref: "Secondary",
  localField: "_id",
  foreignField: "replyToPrimary",
  justOne: false,
});

primaryCommentSchema.virtual("meta", {
  ref: "CommentMeta",
  localField: "_id",
  foreignField: "_id",
  justOne: true,
});

primaryCommentSchema.pre("remove", async function (next) {
  let deleteCommentMeta = await this.model("CommentMeta").findByIdAndRemove(
    this._id
  );

  let secondaryComments = await this.model("Secondary").find({
    replyToPrimary: this._id,
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

const Primary = model<PrimaryCommentDocument>("Primary", primaryCommentSchema);
export default Primary;
