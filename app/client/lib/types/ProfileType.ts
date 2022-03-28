import StoryCollectionType from "./StoryCollectionType";
import Story from "./StoryType";
import User from "./UserType";

interface ProfileType {
  _id: string;
  fullName: string;
  profilePic: string;
  tagLines: string[];

  likedStories: Story["_id"][];
  dislikedStories: Story["_id"][];
  following: User["_id"][];
  followers: User["_id"][];
  storyCollections: StoryCollectionType[];
}

export default ProfileType;
