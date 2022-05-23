import ProfileType from './ProfileType';

interface UserType {
  _id: string;
  email: string;
  username: string;
  role: 'admin' | 'reader' | 'author';
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
  stories: number;
}
export interface GetMeType extends UserType {
  profile: ProfileType;
}
export interface LogInResponseType {
  user: UserType;
  accessToken: string;
  message?: any;
}
export default UserType;
