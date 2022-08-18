export interface IComment {
  _id: string;
  postId?: string;
  user: string;
  avatar: string;
  username: string;
  content: string;
  createdAt?: Date;
}

export interface CommentsDataProps {
  data?: IComment[];
}

export interface CommentDataObj extends CommentsDataProps {
  id: string;
  content: string;
}
