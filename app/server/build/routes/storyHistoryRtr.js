"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const storyHistoryCtrl_1 = __importDefault(require("../controller/storyHistoryCtrl"));
const auth_1 = require("../middleware/auth");
router.use(auth_1.protect);
router
    .route('/:storyId/:historyId')
    .get(storyHistoryCtrl_1.default.getStoryHistoryById)
    .delete(storyHistoryCtrl_1.default.deleteStoryHistoryById.schema, storyHistoryCtrl_1.default.deleteStoryHistoryById.ctrl({ isAll: false }));
router
    .route('/:storyId')
    .get(storyHistoryCtrl_1.default.getStoryHistory)
    .delete(storyHistoryCtrl_1.default.deleteStoryHistoryById.ctrl({ isAll: true }));
exports.default = router;
