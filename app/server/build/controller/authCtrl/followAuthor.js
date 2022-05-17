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
exports.followSchema = void 0;
const utils_1 = require("../../lib/utils");
const Profile_1 = __importDefault(require("../../models/Profile"));
const User_1 = __importStar(require("../../models/User"));
const yup = __importStar(require("yup"));
const mongoose_1 = require("mongoose");
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const followAuthor = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const toFollow = req === null || req === void 0 ? void 0 : req.path.startsWith('/follow');
    const userId = req.user._id.toString(), authorId = req.params.authorId;
    if (userId == authorId)
        return next((0, utils_1.ErrorResponse)(400, "You can't follow yourself"));
    const authorToFollow = yield User_1.default.findOne({
        _id: authorId,
        isEmailVerified: true,
        isAuthorised: true,
    });
    if (!authorToFollow)
        return next((0, utils_1.ErrorResponse)(400, 'Resource not found'));
    const userProfile = yield Profile_1.default.findByIdAndUpdate(userId, toFollow
        ? { $addToSet: { following: authorId } }
        : { $pull: { following: authorId } }, {
        new: true,
    });
    const authorProfile = yield Profile_1.default.findByIdAndUpdate(authorId, toFollow
        ? { $addToSet: { followers: userId } }
        : { $pull: { followers: userId } }, {
        new: true,
    });
    const user = yield User_1.default.findByIdAndUpdate(userId, {
        followers: userProfile === null || userProfile === void 0 ? void 0 : userProfile.followers.length,
        following: userProfile === null || userProfile === void 0 ? void 0 : userProfile.following.length,
    }, { new: true });
    yield authorToFollow.updateOne({
        followers: authorProfile === null || authorProfile === void 0 ? void 0 : authorProfile.followers.length,
        following: authorProfile === null || authorProfile === void 0 ? void 0 : authorProfile.following.length,
    });
    return res.json({
        status: 'ok',
        user: (0, User_1.peelUserDoc)(user),
    });
}));
exports.followSchema = yup.object({
    params: yup.object({
        authorId: yup
            .string()
            .label('authorId')
            .typeError('Must be string')
            .required('Author Id is required')
            .test('authorId', 'Author Id must be valid ID.', (val) => {
            return typeof val != 'string' ? false : (0, mongoose_1.isValidObjectId)(val);
        }),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.followSchema), followAuthor];
