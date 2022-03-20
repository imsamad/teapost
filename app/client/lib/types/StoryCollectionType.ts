import storyType from "./StoryType";
import User from "./UserType";

interface StoryCollectionType {
  _id: string;
  user: User["_id"];
  description: string;
  title: string;
  stories: storyType["_id"];
  isPublic: boolean;
}

export default StoryCollectionType;
