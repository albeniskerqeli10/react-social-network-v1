import { IComment } from "../types/CommentInterfaces";

export interface IPost {
  _id: string;
  text: string;
  username: string;
  avatar: string;
  visibility?: string;
  image?: string;
  likes?: Array<string>;
  createdAt?: Date;
  comments?: Array<IComment>;
  post?: any;
  user?: any;
  isVerified?: boolean;
}

export interface LikeProps {
  message: string;
}
