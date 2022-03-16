"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PostSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "public"
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            default: 0,
        }
    ],
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ]
}, { collection: "posts" });
var Post = (0, mongoose_1.model)("Post", PostSchema);
exports.default = Post;
