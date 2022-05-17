"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.schema = void 0;
const utils_1 = require("../../lib/utils");
const Story_1 = __importStar(require("../../models/Story"));
const StoryHistory_1 = __importDefault(require("../../models/StoryHistory"));
const yup_1 = require("yup");
const mongoose_1 = require("mongoose");
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const ctrl = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const storyId = req.params.storyId;
    const story = yield Story_1.default.findById(storyId);
    const userId = req.user._id.toString();
    const isCollabing = story === null || story === void 0 ? void 0 : story.collabWith.map((id) => id.toString()).includes(userId);
    if (!story || (story.author.toString() != userId && !isCollabing))
        return next((0, utils_1.ErrorResponse)(400, 'No resource found'));
    let warnings = {};
    if (((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.addToHistory) != 'false') {
        yield StoryHistory_1.default.findByIdAndUpdate(storyId, {
            _id: storyId,
            $push: {
                instances: {
                    story: JSON.stringify(story.toJSON()),
                    createdAt: Date.now(),
                },
            },
        }, { upsert: true });
    }
    var _b = req.body, { slug } = _b, rest = __rest(_b, ["slug"]);
    Story_1.storyAllowedFields.forEach((field) => {
        (rest === null || rest === void 0 ? void 0 : rest[field]) && (story[field] = rest[field]);
    });
    if (slug && story.slug != slug) {
        const isStoryExist = yield Story_1.default.findOne({
            slug: req.body.slug,
        });
        if (isStoryExist) {
            warnings['slug'] = ['This slug already exist.'];
        }
        else
            story.slug = req.body.slug;
    }
    story.readingTime = (0, utils_1.readingTime)(story === null || story === void 0 ? void 0 : story.content);
    let newStory = yield story.save();
    return res.status(200).json({
        status: 'ok',
        message: warnings,
        story: newStory,
    });
}));
exports.schema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        title: (0, yup_1.string)().label('title').typeError('Title must be string.'),
        subtitle: (0, yup_1.string)().label('subtitle').typeError('Subtitle must be string'),
        keywords: (0, yup_1.string)()
            .label('keywords')
            .typeError('Keywords must be string/url type'),
        tags: (0, yup_1.array)()
            .label('tags')
            .typeError('tags must of type array')
            .test((val) => !val
            ? true
            : val && Array.isArray(val)
                ? val.every((v) => (0, mongoose_1.isValidObjectId)(v))
                : false),
        slug: (0, yup_1.string)().label('slug').typeError('Slug must be string/url type'),
        content: (0, yup_1.string)()
            .label('content')
            .typeError('Content must be string/url type'),
        titleImage: (0, yup_1.string)()
            .label('titleImage')
            .url('titleImage must be url')
            .typeError('titleImage must be url'),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.schema), ctrl];
