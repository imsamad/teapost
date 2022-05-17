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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeStoryScheme = exports.ctrl = void 0;
const utils_1 = require("../../lib/utils");
const Story_1 = __importStar(require("../../models/Story"));
const nanoid_1 = require("nanoid");
const yup = __importStar(require("yup"));
const mongoose_1 = require("mongoose");
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
exports.ctrl = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const storyExist = yield Story_1.default.findOne({
        slug: req.body.slug,
    });
    let author = req.user._id;
    if (storyExist &&
        (storyExist.author.toString() == author ||
            storyExist.collabWith.map((id) => id.toString()).includes(author))) {
        return res.json({
            status: 'ok',
            story: storyExist,
        });
    }
    else if (storyExist) {
        req.body.slug = req.body.slug + (0, nanoid_1.nanoid)(10);
    }
    let reqBody = {};
    Story_1.storyAllowedFields.forEach((field) => {
        var _a;
        ((_a = req.body) === null || _a === void 0 ? void 0 : _a[field]) && (reqBody[field] = req.body[field]);
    });
    const story = yield Story_1.default.create(Object.assign({ author, readingTime: (0, utils_1.readingTime)((_a = req.body) === null || _a === void 0 ? void 0 : _a.content) }, reqBody));
    return res.json({
        status: 'ok',
        story,
    });
}));
exports.initializeStoryScheme = yup.object({
    body: yup.object({
        title: yup.string().label('title').typeError('Title must be string.'),
        subtitle: yup
            .string()
            .label('subtitle')
            .typeError('Subtitle must be string'),
        keywords: yup
            .string()
            .label('keywords')
            .typeError('Keywords must be string/url type'),
        tags: yup
            .array()
            .label('tags')
            .typeError('tags must of type array')
            .test((val) => !val
            ? true
            : val && Array.isArray(val)
                ? val.every((v) => (0, mongoose_1.isValidObjectId)(v))
                : false),
        slug: yup
            .string()
            .label('slug')
            .typeError('Slug must be string/url type')
            .required(),
        content: yup
            .string()
            .label('content')
            .typeError('Content must be string/url type'),
        titleImage: yup
            .string()
            .label('titleImage')
            .url('titleImage must be url')
            .typeError('titleImage must be url'),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.initializeStoryScheme), exports.ctrl];
