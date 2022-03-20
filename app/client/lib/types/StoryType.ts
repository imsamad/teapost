import StoryMeta from "./StoryMetaType";
import Tag from "./TagType";
import UserType from "./UserType";

interface StoryType {
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
  author: UserType;
  meta?: StoryMeta;
  updatedAt: Date;
  createdAt: Date;
}

export default StoryType;
