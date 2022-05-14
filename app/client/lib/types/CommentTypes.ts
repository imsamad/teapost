import StoryType from './StoryType';
import UserType from './UserType';

export interface PrimaryComment {
  _id: string;
  user: UserType;
  story: StoryType['_id'];
  text: string;
  meta?: CommentMeta;
  noOfReplies: number;
  noOfLikes: number;
  noOfDislikes: number;
  secondaries?: SecondaryComment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SecondaryComment {
  _id: string;
  user: UserType;
  primary: PrimaryComment['_id'];
  text: string;
  secondaryUser?: UserType;
  secondary?: SecondaryComment['_id'];
  meta?: CommentMeta;
  noOfLikes: number;
  noOfDislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentMeta {
  _id: PrimaryComment['_id'] | SecondaryComment['_id'];
  likedBy: UserType['_id'][];
  dislikedBy: UserType['_id'][];
  createdAt: Date;
  updatedAt: Date;
}

export interface CombineComment {
  // common fields
  _id: string;
  text: string;
  user: UserType;
  noOfLikes: number;
  noOfDislikes: number;
  createdAt: Date;
  updatedAt: Date;
  meta?: CommentMeta;

  //primary comment fields
  story?: string;
  noOfReplies?: number;
  //secondary comment fields
  secondary?: string;
  secondaryUser?: UserType;
}
interface PickSecondary
  extends Pick<SecondaryComment, 'primary' | 'secondary' | 'secondaryUser'> {}

// export interface CommentForDisplay
//   extends Omit<PrimaryComment, "story">,
//     Partial<PickSecondary> {}
