import StoryCollectionType from "./StoryCollectionType";
import Story from "./StoryType";
import User from "./UserType";

interface ProfileType {
  _id: string;
  likedStories: Story["_id"][] | Story[];
  dislikedStories: Story["_id"][] | Story[];
  following: User["_id"][] | User[];
  followers: User["_id"][] | User[];
  storyCollections: StoryCollectionType[];
}

export default ProfileType;
