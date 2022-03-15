import { Document, model, Schema } from "mongoose";
import { ErrorResponse } from "../lib/utils";
import { StoryMetaDocument } from "./StoryMetaModel";
import { UserDocument } from "./UserModel";
import StoryType from "../lib/types/storyType";

export interface StoryDocument
  extends Omit<StoryType, "_id" | "meta">,
    Document {
  author: UserDocument["_id"];
  meta?: StoryMetaDocument;
}

const storySchema = new Schema(
  {
    data: Object,
    title: {
      type: String,
      trim: true,
    },
    titleImage: String,
    subtitle: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    tags: {
      type: [
        {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Tag",
        },
      ],
    },
    body: String,
    keywords: {
      type: String,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, "Author of story is required."],
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      require: true,
      default: false,
    },
    isPublishedByAdmin: {
      type: Boolean,
      require: [
        true,
        "Specifying the story, Is published or not is compulsary.",
      ],
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

storySchema.post(["save", "updateOne"], errorHandlerMdlwr);
storySchema.post("findOneAndUpdate", errorHandlerMdlwr);

async function errorHandlerMdlwr(error: any, doc: StoryDocument, next: any) {
  if (error) {
    if (error?.code === 11000) {
      next(
        ErrorResponse(400, {
          slug: `This slug already registered.`,
        })
      );
    } else {
      next(ErrorResponse(400, "Invalid data."));
    }
  } else {
    next(error);
  }
}

storySchema.virtual("meta", {
  ref: "StoryMeta",
  localField: "_id",
  foreignField: "_id",
  justOne: true,
});

const StoryModel = model<StoryDocument>("Story", storySchema);

export default StoryModel;
