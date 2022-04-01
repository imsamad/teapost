import StoryMeta from "./StoryMetaType";
import Tag from "./TagType";
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

  readingTime: number;
  noOfViews: number;
  noOfComments: number;
  noOfLikes: number;
  noOfDislikes: number;

  meta?: StoryMeta;

  author: string;
}

export default Story;
