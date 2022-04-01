import User from "./UserType";

import { ObjectId } from "mongoose";
interface StoryMeta {
  _id: string | ObjectId;
  likedBy: User["_id"][] | User[];
  dislikedBy: User["_id"][] | User[];
}
export default StoryMeta;
