"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateAccessToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.ACCESS_TOKEN, {
        expiresIn: '15m',
    });
};
exports.generateAccessToken = generateAccessToken;
var generateRefreshToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.REFRESH_TOKEN, {
        expiresIn: '7d',
    });
};
exports.generateRefreshToken = generateRefreshToken;
