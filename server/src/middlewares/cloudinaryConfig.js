"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: "social-network-101",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
module.exports = cloudinary_1.default;
