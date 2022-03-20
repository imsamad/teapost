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
}
export default User;
