import StoryMeta from "./StoryMetaType";
import Tag from "./TagType";
import UserType from "./UserType";
import mongoose from "mongoose";

interface Story {
  _id: string | mongoose.Types.ObjectId;
  title: string;
  titleImage: string;
  subtitle: string;
  slug: string;
  tags: Tag[];
  content: string;
  keywords: string;
  isPublished: boolean;
  isPublishedByAdmin: boolean;
  collabWith: UserType["_id"][];
  readingTime: number;
  noOfViews: number;
  noOfComments: number;
  noOfLikes: number;
  noOfDislikes: number;

  meta?: StoryMeta;

  author: UserType["_id"];
}

export default Story;
