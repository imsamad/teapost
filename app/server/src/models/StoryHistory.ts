import mongoose, { Document, Schema } from "mongoose";
import { StoryDocument } from "./Story";

export interface StoryHistoryDocument extends Document {
  _id: StoryDocument["_id"];
  instances: [
    {
      _id: string;
      story: string;
      createdAt: Date;
    }
  ];
}

const storyHistorySchema = new Schema({
  instances: [{ story: String, createdAt: Date }],
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const StoryHistory = mongoose.model<StoryHistoryDocument>(
  "StoryHistory",
  storyHistorySchema
);

export default StoryHistory;
