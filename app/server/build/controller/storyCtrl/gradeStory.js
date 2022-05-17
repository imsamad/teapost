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
exports.schema = void 0;
const utils_1 = require("../../lib/utils");
const Profile_1 = __importDefault(require("../../models/Profile"));
const StoryMeta_1 = __importDefault(require("../../models/StoryMeta"));
const Story_1 = __importDefault(require("../../models/Story"));
const yup = __importStar(require("yup"));
const mongoose_1 = require("mongoose");
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const ctrl = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const like = (_a = req.body.isLike) !== null && _a !== void 0 ? _a : !req.body.isDislike;
    const undo = req.body.undo;
    const storyId = req.params.storyId;
    let story = yield Story_1.default.findById(storyId);
    if (!story)
        return next((0, utils_1.ErrorResponse)(400, 'Resource not found'));
    const user = req.user._id.toString();
    yield Profile_1.default.findByIdAndUpdate(user, like
        ? undo
            ? { _id: user, $pull: { likedStories: storyId } }
            : {
                _id: user,
                $addToSet: { likedStories: storyId },
                $pull: { dislikedStories: storyId },
            }
        :
            undo
                ? { _id: user, $pull: { dislikedStories: storyId } }
                : {
                    _id: user,
                    $addToSet: { dislikedStories: storyId },
                    $pull: { likedStories: storyId },
                }, { upsert: true, new: true });
    const storyMeta = yield StoryMeta_1.default.findByIdAndUpdate(storyId, like
        ? !undo
            ? {
                _id: storyId,
                $addToSet: { likedBy: user },
                $pull: { dislikedBy: user },
            }
            : { _id: storyId, $pull: { likedBy: user } }
        : !undo
            ? {
                _id: storyId,
                $addToSet: { dislikedBy: user },
                $pull: { likedBy: user },
            }
            : { _id: storyId, $pull: { dislikedBy: user } }, { upsert: true, new: true });
    story.noOfLikes = storyMeta.likedBy.length;
    story.noOfDislikes = storyMeta.dislikedBy.length;
    story = yield story.save();
    res.json({
        status: 'ok',
        story,
    });
}));
exports.schema = yup.object({
    params: yup.object({
        storyId: yup
            .string()
            .label('storyId')
            .required()
            .typeError('StoryId must be string type.')
            .test('storyId', 'Story Id must be a valid', (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
    body: yup
        .object()
        .shape({
        isLike: yup
            .boolean()
            .label('isLike')
            .typeError('Express isLike in true/false')
            .when('isDislike', {
            is: (dislike) => typeof dislike === 'undefined',
            then: yup.boolean().required('isLike or isDislike is required'),
        }),
        isDislike: yup
            .boolean()
            .label('isDislike')
            .typeError('Express isDislike in true/false')
            .when('isLike', {
            is: (like) => typeof like === 'undefined',
            then: yup.boolean().required('isLike or isDislike is required'),
        }),
        undo: yup
            .boolean()
            .label('undo')
            .typeError('Express undo in booleans value'),
    }, [['isLike', 'isDislike']])
        .label('body')
        .test('body', 'Provide appropriate data', (val) => typeof val.isDislike == 'undefined' && typeof val.isLike == 'undefined'
        ? false
        : true),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.schema), ctrl];
