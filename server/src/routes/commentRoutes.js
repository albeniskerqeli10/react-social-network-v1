"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Comment Routes
var express_1 = require("express");
var commentController_1 = require("../controllers/commentController");
var authenticate_1 = require("../middlewares/authenticate");
var router = (0, express_1.Router)();
router.route('/').post(authenticate_1.authGuard, commentController_1.addComment);
router.route('/:id').get(authenticate_1.authGuard, commentController_1.getComments);
router.route('/:id/edit').put(authenticate_1.authGuard, commentController_1.editComment);
router.route('/:id/delete').delete(authenticate_1.authGuard, commentController_1.deleteComment);
exports.default = router;
