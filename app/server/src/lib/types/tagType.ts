import { ObjectId } from "mongoose";
interface Tag {
  _id: string | ObjectId;
  tag: string;
}
export default Tag;
