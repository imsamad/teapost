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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../lib/utils");
const StoryCollection_1 = __importDefault(require("../../models/StoryCollection"));
const User_1 = require("../../models/User");
const getCollectionStories = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const page = parseInt(req.query.page) || 1, limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit, endIndex = page * limit;
    const mycollections = yield StoryCollection_1.default.findOne({ _id: req.params.collectionId, user }, { stories: { $slice: [startIndex, endIndex] } }).populate([
        {
            path: 'stories',
            select: '-content',
            populate: { path: 'author', transform: (v) => (0, User_1.peelUserDoc)(v) },
        },
    ]);
    let pagination = { limit };
    if (mycollections === null || mycollections === void 0 ? void 0 : mycollections.stories.length)
        pagination.next = page + 1;
    if (startIndex > 0)
        pagination.prev = page - 1;
    res.json({
        pagination,
        status: 'ok',
        stories: (mycollections === null || mycollections === void 0 ? void 0 : mycollections.stories) || [],
    });
}));
exports.default = getCollectionStories;
