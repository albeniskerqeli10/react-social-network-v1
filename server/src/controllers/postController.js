"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getPrivatePosts = exports.likePost = exports.unlikePost = exports.getPublicPosts = exports.addPost = void 0;
var cloudinary_1 = __importDefault(require("cloudinary"));
var streamifier_1 = __importDefault(require("streamifier"));
var Comment_1 = __importDefault(require("../models/Comment"));
var Post_1 = __importDefault(require("../models/Post"));
var User_1 = __importDefault(require("../models/User"));
// Get all posts from database
var getPublicPosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Post_1.default.find({ visibility: "public" }).sort({
                    createdAt: -1,
                })];
            case 1:
                posts = _a.sent();
                if (posts) {
                    res.json(posts);
                }
                else {
                    res.status(404);
                    throw new Error("Error while getting posts");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getPublicPosts = getPublicPosts;
// Get posts by user id
var getPrivatePosts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Post_1.default.find({ user: req.user._id }).sort({ createdAt: -1 })];
            case 1:
                posts = _a.sent();
                if (posts) {
                    res.json(posts);
                }
                else {
                    res.status(404);
                    throw new Error("Error while getting posts");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getPrivatePosts = getPrivatePosts;
// Get Request to find a post by id
var getPostById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Post_1.default.findById(req.params.id)];
            case 1:
                post = _a.sent();
                if (post) {
                    res.json(post);
                }
                else {
                    res.status(404).send("Post not found");
                }
                return [2 /*return*/];
        }
    });
}); };
var streamUpload = function (req) {
    return new Promise(function (resolve, reject) {
        var stream = cloudinary_1.default.v2.uploader.upload_stream({
            folder: "photos"
        }, function (error, result) {
            if (result) {
                resolve(result);
            }
            else {
                reject(error);
            }
        });
        streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
    });
};
// A Delete Request which can delete a post
var deletePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, userId, post, postUserId, deletePostById, deletePostComments, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                postId = req.params.id;
                userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
                return [4 /*yield*/, Post_1.default.findOne({ _id: postId })];
            case 1:
                post = _b.sent();
                postUserId = post === null || post === void 0 ? void 0 : post.user;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 6, , 7]);
                if (!((postUserId === null || postUserId === void 0 ? void 0 : postUserId.toString()) === (userId === null || userId === void 0 ? void 0 : userId.toString()))) return [3 /*break*/, 5];
                return [4 /*yield*/, Post_1.default.findByIdAndDelete(postId)];
            case 3:
                deletePostById = _b.sent();
                return [4 /*yield*/, Comment_1.default.deleteMany({ postID: postId })];
            case 4:
                deletePostComments = _b.sent();
                if (post === null || post === void 0 ? void 0 : post.image) {
                    cloudinary_1.default.v2.uploader.destroy(post.image);
                }
                res.status(200).json({ message: "Post deleted successfully" });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _b.sent();
                res.status(500).send({ message: "Something goes wrong" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
// A Request which can like a post
var likePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postById, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(req.body.id, {
                        $addToSet: { likes: [req.user._id] },
                    })];
            case 1:
                postById = _a.sent();
                return [2 /*return*/, res.json({ message: "Post liked successfully", isLiked: true })];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, err_2];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.likePost = likePost;
// A Request which can unlike a post
var unlikePost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var postById, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(req.body.id, {
                        $pull: { likes: req.user._id },
                    })];
            case 1:
                postById = _a.sent();
                return [2 /*return*/, res.json({ message: "Post unliked successfully", isLiked: false })];
            case 2:
                err_3 = _a.sent();
                return [2 /*return*/, err_3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.unlikePost = unlikePost;
//A Request which can  create posts
var addPost = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post, result, userById, newPost, pushedPost;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                post = new Post_1.default({
                    user: req.user._id,
                    username: req.user.username,
                    avatar: req.user.avatar,
                    text: req.body.text,
                    createdAt: Date.now(),
                    visibility: req.body.visibility,
                });
                if (!req.file) return [3 /*break*/, 2];
                return [4 /*yield*/, streamUpload(req)];
            case 1:
                result = _a.sent();
                post.image = result.secure_url;
                _a.label = 2;
            case 2: return [4 /*yield*/, User_1.default.findById(req.user._id)];
            case 3:
                userById = _a.sent();
                return [4 /*yield*/, post.save()];
            case 4:
                newPost = _a.sent();
                userById.posts.push(post);
                if (!userById) return [3 /*break*/, 6];
                return [4 /*yield*/, userById.save()];
            case 5:
                pushedPost = _a.sent();
                _a.label = 6;
            case 6:
                if (newPost) {
                    res.json(newPost);
                }
                else {
                    res.status(404).send("Error while creating post");
                }
                return [2 /*return*/];
        }
    });
}); };
exports.addPost = addPost;
