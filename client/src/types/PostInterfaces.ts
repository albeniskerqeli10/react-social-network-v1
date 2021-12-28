import { IComment } from "./CommentInterfaces";

export interface IPost {
  _id:string ;
  text:string;
  username:string;
  avatar:string;
  visibility?:string;
  image?:string;
  likes?:Array<string>;
  createdAt?:Date;
  comments?:Array<IComment>;
  post?:any;
  user?:any;
  
}



export interface LikeProps {
  message: string;
}