import StoryType from "./StoryType";
import UserType from "./UserType";

export interface PrimaryComment {
  _id: string;
  user: UserType["_id"] | UserType;
  story: StoryType["_id"];
  text: string;

  noOfReplies: number;
  noOfLikes: number;
  noOfDislikes: number;
  secondary?: SecondaryComment[];
  meta?: CommentMeta;
  createdAt: Date;
  updatedAt: Date;
}

export interface SecondaryComment {
  _id: string;
  user: UserType["_id"] | UserType;
  primary: PrimaryComment["_id"] | PrimaryComment;
  text: string;
  secondaryUser?: UserType["_id"] | UserType;
  secondary?: SecondaryComment["_id"];
  noOfLikes: number;
  noOfDislikes: number;
  meta?: CommentMeta;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentMeta {
  _id: PrimaryComment["_id"] | SecondaryComment["_id"];
  likedBy: UserType["_id"][];
  dislikedBy: UserType["_id"][];
}
