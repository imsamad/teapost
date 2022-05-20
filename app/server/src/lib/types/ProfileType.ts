import Story from './StoryType';
import User from './UserType';
import { ObjectId } from 'mongoose';
import StoryCollectionType from './StoryCollectionType';
interface ProfileType {
  _id: string | ObjectId;

  likedStories: Story['_id'][] | Story[];
  dislikedStories: Story['_id'][] | Story[];
  following: User['_id'][] | User[];
  followers: User['_id'][] | User[];
  storyCollections: StoryCollectionType[];
}

export default ProfileType;
