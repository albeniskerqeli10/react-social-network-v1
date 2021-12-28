import { Request, RequestHandler, Response } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';
// GET request to find comments  by post id
const getComments: RequestHandler = async (req: Request, res: Response) => {
  const currentComment = await Comment.find({ postID: req.params.id }).sort({ createdAt: -1 });
  if (currentComment) {
    res.status(200).json(currentComment);
  } else {
    res.status(404).json({ message: 'No Comment found' });
  }
};

// Delete request to delete a comment

const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId: string = req.params.id;
    const userId: string = req.user._id;
    const comment: any = await Comment.findById(commentId);
    const commentUserId: string | any = comment.user;
    if (commentUserId?.toString() === userId?.toString()) {
      const deleteCommentById = await Comment.findByIdAndDelete(commentId);
      const deleteCommentFromPost = await Post.findByIdAndUpdate(comment.postID, { $pull: { comments: commentId } });

      res.status(200).json({ message: 'Comment deleted successfully' });
    }
  } catch (err) {
    res.status(404).json({ message: 'Something goes wrong' });
  }
};

// edit request to edit a comment
const editComment = async (req: Request, res: Response) => {
  try {
    const editComment = await Comment.findByIdAndUpdate(req.params.id, { content: req.body.content });
    if (editComment) {
      res.status(200).json({ message: 'Comment edited successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Comment not edited' });
  }
};

// Post request to add a comment
const addComment = async (req: Request, res: Response) => {
  const { avatar, username } = req.user;
  const { content, createdAt, id } = req.body;
  const newComment = new Comment({
    postID: id,
    avatar: avatar,
    username: username,
    content: content,
    user: req.user._id,
    createdAt: createdAt,
  });
  await Post.findByIdAndUpdate(req.body.id, {
    $push: { comments: newComment },
  });

  const savedComment = await newComment.save();

  if (savedComment) {
    res.status(200).json({ message: 'Comment created successfully' });
  } else {
    res.status(404).json({ message: 'Comment not created' });
  }
};

export { getComments, addComment, deleteComment, editComment };

