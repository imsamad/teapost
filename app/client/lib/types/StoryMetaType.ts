import User from "./UserType";

interface StoryMetaType {
  _id: string;
  views: number;
  noOfComment: number;
  likedBy: User["_id"][] | User[];
  dislikedBy: User["_id"][] | User[];
}

export default StoryMetaType;
