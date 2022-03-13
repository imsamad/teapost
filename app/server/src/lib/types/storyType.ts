import StoryMeta from "./storyMetaType";
import Tag from "./tagType";
import mongoose from "mongoose";

interface Story {
  _id: string | mongoose.Types.ObjectId;
  title: string;
  titleImage: string;
  subtitle: string;
  slug: string;
  tags: Tag["_id"] | Tag[];
  body: { text: string; html: string };
  keywords: string;
  isPublished: boolean;
  isPublishedByAdmin: boolean;
  data: Object;
  author: string;
  meta: StoryMeta;
}

export default Story;
