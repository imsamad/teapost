import ProfileType from "./ProfileType";
interface User {
  _id: string;
  email: string;
  username: string;
  role: string | "admin" | "reader" | "author";
  createdAt: Date;

  fullName: string;
  profilePic: string;
  tagLines: string[];
  following: number;
  followers: number;
  isEmailVerified?: boolean;
  isAuthorised?: boolean;
  updatedAt?: Date;
  profile?: ProfileType;
}
export default User;
