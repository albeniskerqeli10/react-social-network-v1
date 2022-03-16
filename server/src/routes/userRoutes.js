"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userController_1 = require("../controllers/userController");
var authenticate_1 = require("../middlewares/authenticate");
// User Routes
var upload_1 = require("../middlewares/upload");
var router = (0, express_1.Router)();
router.post("/login", userController_1.loginUser);
router
    .route("/")
    .post(upload_1.upload.single("avatar"), userController_1.registerUser)
    .get(authenticate_1.authGuard, userController_1.getAllUsers);
/* router.route("/refresh").post(refreshAuth); */
router.route("/:id").get(userController_1.getUserById);
router.route("/:id/follow").get(authenticate_1.authGuard, userController_1.followUser);
router.route("/:id/unfollow").get(authenticate_1.authGuard, userController_1.unfollowUser);
router.route("/:id/edit").put(authenticate_1.authGuard, upload_1.upload.single("avatar"), userController_1.editUser);
router.route("/:id/followers").get(authenticate_1.authGuard, userController_1.getUserFollowers);
router.route('/search/:query').get(userController_1.searchUsers);
exports.default = router;
