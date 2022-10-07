// Post Routes

import express from 'express';
import { addPost, deletePost, getPrivatePosts, getPublicPosts, likePost, unlikePost, getPostById, getLikes } from '../controllers/postController';
import { authGuard } from '../middlewares/authenticate';
import { upload } from '../middlewares/upload';
const router = express.Router();

router.route('/').get(authGuard, getPublicPosts).post(authGuard, upload.single('image'), addPost);
router.get('/myposts', authGuard, getPrivatePosts);
router.get('/publicposts', getPublicPosts);
router.get("/post/:id", getPostById);
router.route('/post/:id/likes').get(authGuard, getLikes);
router.route('/like').patch(authGuard, likePost);
router.route('/unlike').patch(authGuard, unlikePost);
router.route('/:id').delete(authGuard, deletePost);
export default router;
