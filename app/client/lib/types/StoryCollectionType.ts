import storyType from './StoryType';
import User from './UserType';

export interface StoryCollectionType {
  _id: string;
  user: User['_id'];
  description: string;
  title: string;
  stories: storyType['_id'][];
  isPublic: boolean;
}
export interface StoryCollectionTypePopulated
  extends Omit<StoryCollectionType, 'stories'> {
  stories: storyType[];
}
