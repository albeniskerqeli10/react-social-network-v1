import { IPost } from "../types/PostInterfaces";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  password: string;
  accessToken: string;
  followers: Array<string>;
  following: Array<string>;
  posts: Array<IPost>;
}
export interface LoginProps {
  email: string;
  password: string;
}

export interface AuthProps {
  username?: string;
  password: string;
  email: string;
}
