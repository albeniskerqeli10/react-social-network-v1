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
exports.unfollowUser = exports.editUser = exports.searchUsers = exports.followUser = exports.getUserFollowers = exports.getUserById = exports.getAllUsers = exports.registerUser = exports.loginUser = void 0;
var cloudinary_1 = __importDefault(require("cloudinary"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var streamifier_1 = __importDefault(require("streamifier"));
var Comment_1 = __importDefault(require("../models/Comment"));
var Post_1 = __importDefault(require("../models/Post"));
var User_1 = __importDefault(require("../models/User"));
var generateToken_1 = require("../utils/generateToken");
var refreshTokens = [];
// Login Route
var loginUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, _b, accessToken, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                user = _c.sent();
                _b = user;
                if (!_b) return [3 /*break*/, 3];
                return [4 /*yield*/, user.matchPassword(password)];
            case 2:
                _b = (_c.sent());
                _c.label = 3;
            case 3:
                if (_b) {
                    accessToken = (0, generateToken_1.generateAccessToken)(user._id);
                    res.json({
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        avatar: user.avatar,
                        accessToken: accessToken,
                    });
                }
                return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                res.status(404).send("Invalid Credentials");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var streamUpload = function (req) {
    return new Promise(function (resolve, reject) {
        var stream = cloudinary_1.default.v2.uploader.upload_stream({
            folder: "avatars"
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
// Register Route
var registerUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, avatar, password, posts, userExists, user, result, savedUser, accessToken, refreshToken, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, username = _a.username, email = _a.email, avatar = _a.avatar, password = _a.password, posts = _a.posts;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                userExists = _b.sent();
                if (!userExists) return [3 /*break*/, 2];
                res.status(404).json({ message: "User already exists" });
                return [3 /*break*/, 6];
            case 2:
                user = new User_1.default({
                    username: username,
                    email: email,
                    password: password,
                });
                if (!(req === null || req === void 0 ? void 0 : req.file)) return [3 /*break*/, 4];
                return [4 /*yield*/, streamUpload(req)];
            case 3:
                result = _b.sent();
                user.avatar = result.secure_url;
                _b.label = 4;
            case 4: return [4 /*yield*/, user.save()];
            case 5:
                savedUser = _b.sent();
                accessToken = (0, generateToken_1.generateAccessToken)(savedUser._id);
                refreshToken = (0, generateToken_1.generateRefreshToken)(savedUser._id);
                res.json({
                    _id: savedUser._id,
                    username: savedUser.username,
                    email: savedUser.email,
                    avatar: savedUser.avatar,
                    accessToken: accessToken,
                });
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_2 = _b.sent();
                res.status(500).json({ message: "Something went wrong" });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.find({ _id: { $ne: req.user._id } })
                    .sort({ createdAt: -1 })
                    .select("-password")];
            case 1:
                users = _a.sent();
                res.json(users);
                return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var refreshAuth = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken;
    return __generator(this, function (_a) {
        refreshToken = req.body.token;
        if (!refreshToken)
            return [2 /*return*/, res.status(401).json("You are not authenticated")];
        if (!refreshTokens.includes(refreshToken)) {
            return [2 /*return*/, res.status(403).json("Refresh token is not valid")];
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN, function (id) {
            refreshTokens = refreshTokens.filter(function (token) { return token !== refreshToken; });
            var newAccessToken = (0, generateToken_1.generateAccessToken)(id);
            var newRefreshToken = (0, generateToken_1.generateRefreshToken)(id);
            refreshTokens.push(newRefreshToken);
            res.json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
        return [2 /*return*/];
    });
}); };
var getUserById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.id;
                return [4 /*yield*/, User_1.default.findById(userId)
                        .select("-password")
                        .populate("posts")];
            case 1:
                user = _a.sent();
                if (user) {
                    res.json(user);
                }
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(404).json({ message: "User not found" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var followUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var followUser_1, user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!(req.params.id === req.user._id)) return [3 /*break*/, 1];
                res.status(404).json({ message: "You cannot follow yourself" });
                return [3 /*break*/, 4];
            case 1: return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { followers: req.user._id } })];
            case 2:
                followUser_1 = _a.sent();
                return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: req.user._id }, { $addToSet: { following: req.params.id } })];
            case 3:
                user = _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, res.status(200).send({ message: "User followed successfully" })];
            case 5:
                err_4 = _a.sent();
                return [2 /*return*/, res
                        .status(500)
                        .send({ message: "Error while tried to follow a user" })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.followUser = followUser;
var unfollowUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var unfollowingUser, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(req.params.id, {
                        $pull: { followers: req.user._id },
                    })];
            case 1:
                unfollowingUser = _a.sent();
                return [2 /*return*/, res.status(200).send({ message: "User unfollowed successfully" })];
            case 2:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).send({ message: "User UnFollow Failed" })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.unfollowUser = unfollowUser;
var getUserFollowers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var currentUser, followersArr, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, User_1.default.findById(req.params.id)];
            case 1:
                currentUser = _a.sent();
                return [4 /*yield*/, User_1.default.find({ _id: { $in: currentUser.followers } }).select('-password')];
            case 2:
                followersArr = _a.sent();
                if (followersArr) {
                    res.json({ data: followersArr, message: "Data found" });
                }
                return [3 /*break*/, 4];
            case 3:
                err_6 = _a.sent();
                res.status(500).json({ message: "Error while trying to get followers" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserFollowers = getUserFollowers;
var searchUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userVal, usersArr, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userVal = new RegExp(req.params.query, 'i');
                return [4 /*yield*/, User_1.default.find({ username: { $regex: userVal }, })];
            case 1:
                usersArr = _a.sent();
                res.status(200).json(usersArr);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.status(404).json({ message: "No user found" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchUsers = searchUsers;
var editUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, email, avatar, result, editedUser, posts, i, comments, i, err_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 14, , 15]);
                _a = req.body, username = _a.username, email = _a.email, avatar = _a.avatar;
                if (!(req === null || req === void 0 ? void 0 : req.file)) return [3 /*break*/, 2];
                return [4 /*yield*/, streamUpload(req)];
            case 1:
                result = _b.sent();
                avatar = result.secure_url;
                _b.label = 2;
            case 2: return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: req.params.id }, {
                    $set: {
                        username: username,
                        email: email,
                        avatar: avatar,
                    }
                }, { new: true })];
            case 3:
                editedUser = _b.sent();
                return [4 /*yield*/, Post_1.default.find({ user: req.params.id })];
            case 4:
                posts = _b.sent();
                i = 0;
                _b.label = 5;
            case 5:
                if (!(i < posts.length)) return [3 /*break*/, 8];
                return [4 /*yield*/, Post_1.default.findByIdAndUpdate(posts[i]._id, {
                        $set: {
                            avatar: avatar,
                            username: username,
                        },
                    })];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8: return [4 /*yield*/, Comment_1.default.find({ user: req.params.id })];
            case 9:
                comments = _b.sent();
                i = 0;
                _b.label = 10;
            case 10:
                if (!(i < comments.length)) return [3 /*break*/, 13];
                return [4 /*yield*/, Comment_1.default.findByIdAndUpdate(comments[i]._id, {
                        $set: {
                            avatar: avatar,
                            username: username,
                        }
                    })];
            case 11:
                _b.sent();
                _b.label = 12;
            case 12:
                i++;
                return [3 /*break*/, 10];
            case 13:
                res.status(200).json(editedUser);
                return [3 /*break*/, 15];
            case 14:
                err_8 = _b.sent();
                res.status(500).json({ message: "Error while trying to edit user" });
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.editUser = editUser;
