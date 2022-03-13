"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storyCtrl_1 = require("../controller/storyCtrl");
const auth_1 = require("../middleware/auth");
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const story_1 = require("../lib/schema/story");
const router = (0, express_1.default)();
router
    .route("/published/:storyId")
    .put(auth_1.protect, (0, validateSchema_1.default)(story_1.publishedStorySchema), storyCtrl_1.publishedStory);
router
    .route("/grade/:storyId")
    .put(auth_1.protect, (0, validateSchema_1.default)(story_1.gradeStorySchema), (req, res, next) => {
    const isLike = typeof req.body.like !== "undefined" ? true : false;
    const gradeCount = isLike
        ? parseInt(req.body.like)
        : parseInt(req.body.dislike);
    return (0, storyCtrl_1.gradeStory)(isLike, gradeCount)(req, res, next);
});
router
    .route("/like/undo/:storyId")
    .put(auth_1.protect, (0, validateSchema_1.default)(story_1.likeOrDislikeSchema), (0, storyCtrl_1.gradeStory)(true, 0));
router
    .route("/dislike/:storyId")
    .put(auth_1.protect, (0, validateSchema_1.default)(story_1.likeOrDislikeSchema), (0, storyCtrl_1.gradeStory)(false, 1));
router
    .route("/like/:storyId")
    .put(auth_1.protect, (0, validateSchema_1.default)(story_1.likeOrDislikeSchema), (0, storyCtrl_1.gradeStory)(true, 1));
router
    .route("/dislike/undo/:storyId")
    .put(auth_1.protect, (0, validateSchema_1.default)(story_1.likeOrDislikeSchema), (0, storyCtrl_1.gradeStory)(false, 0));
router
    .route("/")
    .post(auth_1.protect, (0, validateSchema_1.default)(story_1.createStorySchema, true), storyCtrl_1.handleTags, storyCtrl_1.createOrUpdateStory)
    .put(auth_1.protect, (0, validateSchema_1.default)(story_1.createStorySchema, true), storyCtrl_1.handleTags, storyCtrl_1.createOrUpdateStory)
    .get(storyCtrl_1.getAllStories);
exports.default = router;
