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
const CommentMeta_1 = __importDefault(require("../../models/Comment/CommentMeta"));
const Primary_1 = __importDefault(require("../../models/Comment/Primary"));
const Secondary_1 = __importDefault(require("../../models/Comment/Secondary"));
const yup = __importStar(require("yup"));
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const likeOrDislike = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isLike = (_a = req.body.isLike) !== null && _a !== void 0 ? _a : !req.body.isDislike, undo = req.body.undo;
    const user = req.user._id;
    const isPrimary = req.path.endsWith('/primary');
    const CommentType = isPrimary ? Primary_1.default : Secondary_1.default;
    let comment = yield CommentType.findById(req.params.commentId);
    if (!comment)
        return next((0, utils_1.ErrorResponse)(400, 'No resource found'));
    const commentId = comment._id;
    const commentMeta = yield CommentMeta_1.default.findByIdAndUpdate(commentId, isLike
        ? undo
            ? { _id: commentId, $pull: { likedBy: user } }
            : {
                _id: commentId,
                $addToSet: { likedBy: user },
                $pull: { dislikedBy: user },
            }
        : undo
            ? { _id: commentId, $pull: { dislikedBy: user } }
            : {
                _id: commentId,
                $addToSet: { dislikedBy: user },
                $pull: { likedBy: user },
            }, {
        upsert: true,
        new: true,
    });
    comment.noOfLikes = commentMeta.likedBy.length;
    comment.noOfDislikes = commentMeta.dislikedBy.length;
    comment.updatedAt = comment.createdAt;
    yield comment.save();
    res.json({
        status: 'ok',
        comment: yield comment.save(),
    });
}));
exports.schema = yup.object({
    body: yup
        .object()
        .shape({
        isLike: yup
            .boolean()
            .label('isLike')
            .typeError('Express isLike in true/false')
            .when('isDislike', {
            is: (dislike) => typeof dislike === 'undefined',
            then: yup.boolean().required('Like or dislike is required'),
        }),
        isDislike: yup
            .boolean()
            .label('isDislike')
            .typeError('Express isDislike in true/false')
            .when('isLike', {
            is: (like) => typeof like === 'undefined',
            then: yup.boolean().required('Like or dislike is required'),
        }),
        undo: yup
            .boolean()
            .label('undo')
            .typeError('Express undo in booleans value'),
    }, [['isLike', 'isDislike']])
        .label('body')
        .test('body', 'Provide appropriate data', (val) => {
        return (0, utils_1.typeOf)(val.isDislike, 'boolean') || (0, utils_1.typeOf)(val.isLike, 'boolean')
            ? true
            : false;
    }),
    params: yup.object({
        commentId: yup
            .string()
            .label('commentId')
            .typeError('commentId must be valid.')
            .required()
            .test('commentId', 'commentId must be valid.', (val) => (0, utils_1.typeOf)(val, 'mongoId')),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.schema), likeOrDislike];
