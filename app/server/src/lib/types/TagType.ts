import { ObjectId } from "mongoose";
interface Tag {
  _id: string | ObjectId;
  title: string;
}
export default Tag;
