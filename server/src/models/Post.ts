import mongoose, { Schema, Document, model } from 'mongoose';

export interface IPost extends Document {
  text: string;
  username: string;
  createdAt: Date;
  image: string;
  visibility: string;
  user: string;
  likes?: Array<object>;
  isVerified?: boolean;
};

const PostSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    image: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: 0,
      },
    ],

    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { collection: 'posts' }
);

const Post = model<IPost>('Post', PostSchema);
export default Post;
