import StoryMeta from "./StoryMetaType";
import Tag from "./TagType";
import mongoose from "mongoose";

interface Story {
  _id: string | mongoose.Types.ObjectId;
  title: string;
  titleImage: string;
  subtitle: string;
  slug: string;
  tags: Tag["_id"] | Tag[];
  content: { text: string; html: string };
  keywords: string;
  isPublished: boolean;
  isPublishedByAdmin: boolean;
  data: Object;
  author: string;
  meta: StoryMeta;
  readingTime: number;
}

export default Story;
