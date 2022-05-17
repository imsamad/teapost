"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentCtrl_1 = __importDefault(require("../controller/commentCtrl"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.default)();
router.get('/primaries/:storyId', commentCtrl_1.default.getPrimaries);
router.get('/secondaries/:primaryId', commentCtrl_1.default.getSecondaries);
router.use(auth_1.protect);
router.post('/primaries/:storyId', commentCtrl_1.default.createPrimary);
router.post('/secondaries/reply/:secondaryId', commentCtrl_1.default.replyToSecondary);
router.post('/secondaries/:primaryId', commentCtrl_1.default.createSecondary);
router.patch(['/grade/:commentId/primary', '/grade/:commentId/secondary'], commentCtrl_1.default.likeOrDislike);
router
    .route(['/primaries/:commentId', '/secondaries/:commentId'])
    .put(commentCtrl_1.default.updateOrDeleteComment)
    .delete(commentCtrl_1.default.updateOrDeleteComment);
exports.default = router;
