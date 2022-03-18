interface UserType {
  _id: string;
  email: string;
  username: string;
  password: string;
  isEmailVerified: boolean;
  isAuthorised: boolean;
  role: string | "admin" | "reader" | "author";
  createdAt?: Date;
  updatedAt?: Date;
}
export default UserType;
