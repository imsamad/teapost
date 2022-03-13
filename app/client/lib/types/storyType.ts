import StoryMeta from "./storyMetaType";
import Tag from "./tagType";

interface Story {
  _id: string;
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
  updatedAt: Date;
  createdAt: Date;
}

export default Story;
