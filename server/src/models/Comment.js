"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// Defined Schema for Comment 
var CommentSchema = new mongoose_1.Schema({
    avatar: { type: String, required: true },
    username: { type: String, required: true },
    content: { type: String, required: true },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: { type: Date, default: Date.now },
    postID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post' }
});
// Initialize model for Comment Schema
var Comment = (0, mongoose_1.model)("Comment", CommentSchema);
exports.default = Comment;
