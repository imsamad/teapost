import StoryMeta from "./StoryMetaType";
import Tag from "./TagType";
import UserType from "./UserType";

interface StoryType {
  _id: string;
  title: string;
  titleImage: string;
  subtitle: string;
  slug: string;
  tags: Tag[];
  content: string;
  keywords: string;
  isPublished: boolean;

  isPublishedByAdmin?: boolean;
  readingTime: number;

  noOfViews: number;
  noOfComments: number;
  noOfLikes: number;
  noOfDislikes: number;

  author: UserType;
  meta?: StoryMeta;
  updatedAt: Date;
  createdAt: Date;
}
export interface StoryFormType
  extends Omit<
    StoryType,
    | "isPublishedByAdmin"
    | "readingTime"
    | "author"
    | "meta"
    | "updatedAt"
    | "createdAt"
  > {
  additionalTags: string[];
}
export default StoryType;
