import User from "./UserType";

interface StoryMetaType {
  _id: string;
  views: number;
  comments: number;
  likedBy: User["_id"][] | User[];
  dislikedBy: User["_id"][] | User[];
}
export default StoryMetaType;
