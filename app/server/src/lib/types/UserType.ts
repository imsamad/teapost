import ProfileType from "./ProfileType";
interface User {
  _id: string;
  email: string;
  username: string;
  profilePic: string;
  password: string;
  isEmailVerified: boolean;
  isAuthorised: boolean;
  role: string | "admin" | "reader" | "author";
  createdAt?: Date;
  updatedAt?: Date;
  profile?: ProfileType;
}
export default User;
