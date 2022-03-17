import Story from "./storyType";
import User from "./userType";

interface StoryCollectionType {
  user: User["_id"];
  description: string;
  title: string;
  stories: Story["_id"][] | Story[];
  isPublic: boolean;
}

export default StoryCollectionType;
