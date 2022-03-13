import User from "./userType";

interface StoryMeta {
  _id: string;
  views: number;
  comments: number;
  likedBy: User["_id"][] | User[];
  dislikedBy: User["_id"][] | User[];
}
export default StoryMeta;
