import Story from "./StoryType";
import User from "./UserType";

interface StoryCollectionType {
  user: User["_id"];
  description: string;
  title: string;
  stories: Story["_id"][] | Story[];
  isPublic: boolean;
}

export default StoryCollectionType;
