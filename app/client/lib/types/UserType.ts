import ProfileType from "./ProfileType";

interface UserType {
  _id: string;
  email: string;
  username: string;
  password: string;
  isEmailVerified: boolean;
  isAuthorised: boolean;

  role: string | "admin" | "reader" | "author";
  createdAt: Date;
  updatedAt: Date;
  profile: ProfileType;
}

export interface AuthUser
  extends Pick<UserType, "email" | "username" | "_id" | "role" | "createdAt"> {
  accessToken: string;
}

export default UserType;
