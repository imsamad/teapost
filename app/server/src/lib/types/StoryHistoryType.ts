export interface StoryHistoryType {
  _id: string;
  instances: [{ _id: string; story: string; createdAt: Date }];
}
