// Comment Routes
import { Router } from 'express';
import { addComment, deleteComment, editComment, getComments } from '../controllers/commentController';
import { authGuard } from '../middlewares/authenticate';
const router = Router();

router.route('/').post(authGuard, addComment);
router.route('/:id').get(authGuard, getComments);
router.route('/:id/edit').patch(authGuard, editComment);
router.route('/:id/delete').delete(authGuard, deleteComment);

export default router;
