"use strict";
// Post Routes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var postController_1 = require("../controllers/postController");
var authenticate_1 = require("../middlewares/authenticate");
var upload_1 = require("../middlewares/upload");
var router = express_1.default.Router();
router.route('/').get(authenticate_1.authGuard, postController_1.getPublicPosts).post(authenticate_1.authGuard, upload_1.upload.single('image'), postController_1.addPost);
router.get('/myposts', authenticate_1.authGuard, postController_1.getPrivatePosts);
router.route('/like').post(authenticate_1.authGuard, postController_1.likePost);
router.route('/unlike').post(authenticate_1.authGuard, postController_1.unlikePost);
router.route('/:id').delete(authenticate_1.authGuard, postController_1.deletePost);
exports.default = router;
