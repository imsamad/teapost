import story from "./StoryType";
import user from "./UserType";

export interface PrimaryComment {
  _id: string;
  isPrimary: boolean;
  user: user["_id"];
  story: story["_id"];
  text: string;
  meta: CommentMeta;
}

export interface SecondaryComment {
  _id: string;
  user: user["_id"];
  replyTo: PrimaryComment["_id"];
  text: string;
  meta: CommentMeta;
}

export interface TertiaryComment {
  _id: string;
  user: user["_id"];
  replyTo: SecondaryComment["_id"];
  text: string;
  meta: CommentMeta;
}

export interface CommentMeta {
  _id: PrimaryComment["_id"] | SecondaryComment["_id"] | TertiaryComment["_id"];
  likedBy: user["_id"][];
  dislikedBy: user["_id"][];
}
