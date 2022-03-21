import { Document, model, Schema } from "mongoose";
import { ErrorResponse } from "../lib/utils";
import { StoryMetaDocument } from "./StoryMeta";
import { UserDocument } from "./User";
import StoryType from "../lib/types/StoryType";

export interface StoryDocument
  extends Omit<StoryType, "_id" | "meta">,
    Document {
  author: UserDocument["_id"];
  meta?: StoryMetaDocument;
}

const storySchema = new Schema(
  {
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
    readingTime: { type: Number, default: 0 },
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

storySchema.virtual("comments", {
  ref: "Primary",
  localField: "_id",
  foreignField: "story",
  justOne: false,
});

storySchema.pre("remove", async function (next) {
  await this.model("StoryMeta").findByIdAndRemove(this._id);

  let deletedPrimary: any = await this.model("Primary").find({
    story: this._id,
  });

  let deletedPrimaryPromise: any = deletedPrimary.map(
    (primary: any, index: any) => primary.remove()
  );

  Promise.allSettled(deletedPrimaryPromise)
    .then((res: any) => {})
    .finally(() => {
      next();
    });
});

const StoryModel = model<StoryDocument>("Story", storySchema);

export default StoryModel;
