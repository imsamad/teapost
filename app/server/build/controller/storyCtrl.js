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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradeStory = exports.publishedStory = exports.handleTags = exports.getAllStories = exports.createOrUpdateStory = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../lib/utils");
const ProfileModel_1 = __importDefault(require("../models/ProfileModel"));
const StoryMetaModel_1 = __importDefault(require("../models/StoryMetaModel"));
const StoryModel_1 = __importDefault(require("../models/StoryModel"));
const TagModel_1 = __importDefault(require("../models/TagModel"));
const story_1 = require("../lib/schema/story");
exports.createOrUpdateStory = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (req.body.id)
        query._id = req.body.id;
    else
        query.slug = req.body.slug;
    const storyExist = yield StoryModel_1.default.findOne(query);
    if (storyExist) {
        let extraMessage = {};
        if (storyExist.author.toString() !== req.user._id.toString()) {
            return next((0, utils_1.ErrorResponse)(400, "this slug already exist"));
        }
        var _a = req.body, { id, slug, isPublished } = _a, rest = __rest(_a, ["id", "slug", "isPublished"]);
        Object.keys(rest).forEach((field) => {
            storyExist[field] = req.body[field];
        });
        if (req.body.id && req.body.slug && storyExist.slug !== req.body.slug) {
            const storyExistWithNewSlug = yield StoryModel_1.default.findOne({
                slug: req.body.slug,
            });
            if (storyExistWithNewSlug) {
                extraMessage["slug"] = ["This slug already exist."];
            }
            else
                storyExist.slug = req.body.slug;
        }
        if (typeof req.body.isPublished !== "undefined" &&
            req.body.isPublished === false)
            storyExist.isPublished = false;
        sendResponse(req.body.isPublished, storyExist, res, extraMessage);
    }
    else {
        const _b = req.body, { id, isPublished } = _b, rest = __rest(_b, ["id", "isPublished"]);
        let newStory = new StoryModel_1.default(Object.assign(Object.assign({}, rest), { author: req.user._id }));
        yield StoryMetaModel_1.default.create({ _id: newStory.id });
        sendResponse(isPublished, newStory, res);
    }
}));
const sendResponse = (isPublished, story, res, extraMessage) => __awaiter(void 0, void 0, void 0, function* () {
    if (isPublished) {
        try {
            const result = yield (0, utils_1.validateYupSchema)(story_1.isAbleToPublished, story);
            story.isPublished = true;
            story = yield story.save();
            return res.status(200).json({
                status: "ok",
                story: story,
                message: extraMessage,
            });
        }
        catch (err) {
            story.isPublished = false;
            story = yield story.save();
            return res.status(200).json({
                status: "ok",
                story,
                message: err,
            });
        }
    }
    else {
        story = yield story.save();
        return res.status(200).json({
            status: "ok",
            story,
            message: extraMessage,
        });
    }
});
exports.getAllStories = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const stories = yield StoryModel_1.default.find(Object.assign({}, query)).populate([
        { path: "meta" },
        {
            path: "author",
            select: "username email",
        },
        {
            path: "tags",
            select: "tag",
        },
    ]);
    return res.status(200).json({
        status: "ok",
        stories,
    });
}));
exports.handleTags = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    if (!((_d = (_c = req.body) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d.length) && !((_f = (_e = req.body) === null || _e === void 0 ? void 0 : _e.additionalTags) === null || _f === void 0 ? void 0 : _f.length)) {
        return next();
    }
    let alreadyExistedTags = [];
    let newTags = [];
    (_h = (_g = req.body) === null || _g === void 0 ? void 0 : _g.tags) === null || _h === void 0 ? void 0 : _h.forEach((tag) => {
        (0, mongoose_1.isValidObjectId)(tag) ? alreadyExistedTags.push(tag) : newTags.push(tag);
    });
    if ((_k = (_j = req.body) === null || _j === void 0 ? void 0 : _j.additionalTags) === null || _k === void 0 ? void 0 : _k.length)
        (_m = (_l = req.body) === null || _l === void 0 ? void 0 : _l.additionalTags) === null || _m === void 0 ? void 0 : _m.forEach((tag) => {
            (0, mongoose_1.isValidObjectId)(tag) ? alreadyExistedTags.push(tag) : newTags.push(tag);
        });
    req.body.tags = [];
    req.body.additionalTags = "";
    if (!newTags.length) {
        req.body.tags = alreadyExistedTags;
        return next();
    }
    let oldTags = [];
    newTags = newTags.map((tag) => TagModel_1.default.create({ tag })
        .then((res) => {
        alreadyExistedTags === null || alreadyExistedTags === void 0 ? void 0 : alreadyExistedTags.push(res.id || res._id);
        return res;
    })
        .catch((err) => {
        oldTags.push(TagModel_1.default.findOne({ tag })
            .then((oldTag) => {
            alreadyExistedTags.push(oldTag.id || oldTag._id);
        })
            .catch((err) => { }));
        return err;
    }));
    Promise.allSettled(newTags).then((resOuter) => {
        Promise.allSettled(oldTags).then((resInner) => {
            req.body.tags = alreadyExistedTags;
            next();
        });
    });
}));
exports.publishedStory = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    let story = yield StoryModel_1.default.findById(req.params.storyId);
    if (!story)
        return next((0, utils_1.ErrorResponse)(400, "No resources found with this id."));
    try {
        yield (0, utils_1.validateYupSchema)(story_1.isAbleToPublished, story);
        story.isPublished = (_o = req.body.isPublished) !== null && _o !== void 0 ? _o : true;
        story = yield story.save();
        return res.status(200).json({ status: "ok", story });
    }
    catch (err) {
        return next((0, utils_1.ErrorResponse)(400, err));
    }
}));
const gradeStory = (isLike, gradeCount) => (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const storyId = req.params.storyId;
    let story = yield StoryModel_1.default.findById(storyId);
    if (!story)
        return next((0, utils_1.ErrorResponse)(400, "Resource not found"));
    const user = req.user._id.toString();
    const profile = yield ProfileModel_1.default.findByIdAndUpdate(user, isLike
        ? gradeCount > 0
            ? {
                _id: user,
                $addToSet: { likedStories: storyId },
                $pull: { dislikedStories: storyId },
            }
            : { _id: user, $pull: { likedStories: storyId } }
        : gradeCount > 0
            ? {
                _id: user,
                $addToSet: { dislikedStories: storyId },
                $pull: { likedStories: storyId },
            }
            : { _id: user, $pull: { dislikedStories: storyId } }, { upsert: true, new: true });
    const storyMeta = yield StoryMetaModel_1.default.findByIdAndUpdate(storyId, isLike
        ? gradeCount > 0
            ? {
                _id: storyId,
                $addToSet: { likedBy: user },
                $pull: { dislikedBy: user },
            }
            : { _id: storyId, $pull: { likedBy: user } }
        : gradeCount > 0
            ? {
                _id: storyId,
                $addToSet: { dislikedBy: user },
                $pull: { likedBy: user },
            }
            : { _id: storyId, $pull: { dislikedBy: user } }, { upsert: true, new: true });
    res.json({
        status: "ok",
        storyMeta,
    });
}));
exports.gradeStory = gradeStory;
