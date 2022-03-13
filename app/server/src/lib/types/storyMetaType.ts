import User from "./userType";

import { ObjectId } from "mongoose";
interface StoryMeta {
  _id: string | ObjectId;
  views: number;
  comments: number;
  likedBy: User["_id"][] | User[];
  dislikedBy: User["_id"][] | User[];
}
export default StoryMeta;
