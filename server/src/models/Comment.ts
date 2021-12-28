import { model, Schema } from "mongoose";
// Interface for Comment 
export interface IComment extends Document {
  postID:string;
  avatar: string;
  username: string;
  user:string;
  content: string;
  createdAt: Date;
}

// Defined Schema for Comment 
const CommentSchema: Schema = new Schema({
  avatar: { type: String, required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
  postID:{type:Schema.Types.ObjectId,  ref:'Post'}
});

// Initialize model for Comment Schema

const Comment = model<IComment>("Comment", CommentSchema);

export default Comment;
