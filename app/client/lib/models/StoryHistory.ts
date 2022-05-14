import mongoose, { Document, Schema, Types } from 'mongoose';
import { StoryDocument } from './Story';

export interface StoryHistoryDocument extends Document {
  _id: StoryDocument['_id'];
  instances: Types.Array<{
    _id: string;
    story: string;
    createdAt: Date;
  }>;
}

const storyHistorySchema = new Schema({
  instances: [{ story: String, createdAt: Date }],
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const StoryHistory =
  mongoose.models?.StoryHistory ||
  mongoose.model<StoryHistoryDocument>('StoryHistory', storyHistorySchema);

export default StoryHistory;
export const ParseDoc = (storyHistory: StoryHistoryDocument) => {
  let storyHistoryJSON = storyHistory?.toJSON();
  // @ts-ignore
  let { instances = [], _v, ...rest } = storyHistoryJSON;
  // @ts-ignore
  instances = instances?.map(({ story, _v, ...rest }) => ({
    ...rest,
    story: JSON.parse(story),
  }));
  return { ...rest, instances };
};
