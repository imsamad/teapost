interface UserType {
  _id: string;
  email: string;
  username: string;
  password: string;
  isEmailVerified: boolean;
  isAuthorised: boolean;
  profilePic?: string;
  role: string | "admin" | "reader" | "author";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthUser
  extends Pick<UserType, "email" | "username" | "_id" | "role" | "createdAt"> {
  accessToken?: string;
}

export default UserType;
