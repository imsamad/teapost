import storyType from "./storyType";
import User from "./userType";

interface StoryCollectionType {
  _id: string;
  user: User["_id"];
  description: string;
  title: string;
  stories: storyType["_id"] | storyType[];
  isPublic: boolean;
}

export default StoryCollectionType;
