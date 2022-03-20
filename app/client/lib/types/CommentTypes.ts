import StoryType from "./StoryType";
import UserType from "./UserType";

export interface PrimaryComment {
  _id: string;
  user: UserType;
  story: StoryType["_id"];
  text: string;
  meta?: CommentMeta;
  secondary: SecondaryComment[];
}

export interface SecondaryComment {
  _id: string;
  user: UserType;
  replyToPrimary: PrimaryComment["_id"] | PrimaryComment;
  text: string;
  replyToSecondaryUser?: UserType;
  replyToSecondary?: SecondaryComment["_id"];
  meta?: CommentMeta;
}

export interface CommentMeta {
  _id: PrimaryComment["_id"] | SecondaryComment["_id"];
  likedBy: UserType["_id"][];
  dislikedBy: UserType["_id"][];
}
interface PickSecondary
  extends Pick<
    SecondaryComment,
    "replyToPrimary" | "replyToSecondary" | "replyToSecondaryUser"
  > {}

export interface CommentForDisplay
  extends Omit<PrimaryComment, "story">,
    Partial<PickSecondary> {}
