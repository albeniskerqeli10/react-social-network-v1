import { Router } from "express";
import { editUser, followUser, getAllUsers, getUserById, getUserFollowers, loginUser, registerUser, searchUsers, unfollowUser } from "../controllers/userController";
import { authGuard } from "../middlewares/authenticate";
// User Routes
import { upload } from "../middlewares/upload";
const router = Router();

router.post("/login", loginUser);
router
  .route("/")
  .post(upload.single("avatar"), registerUser)
  .get(authGuard, getAllUsers);
/* router.route("/refresh").post(refreshAuth); */
  router.route("/:id").get(getUserById);
  router.route("/:id/follow").get(authGuard, followUser);
  router.route("/:id/unfollow").get(authGuard, unfollowUser);
  router.route("/:id/edit").put(authGuard, upload.single("avatar"), editUser);
router.route("/:id/followers").get(authGuard, getUserFollowers);
router.route('/search/:query').get(searchUsers);

export default router;
