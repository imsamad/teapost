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
const User_1 = __importDefault(require("../../models/User"));
const getMe = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    let populateAble = [
        'likedStories',
        'dislikedStories',
        'following',
        'followers',
        'collabStories',
        'storyCollections',
    ];
    let populate = {
        path: 'profile',
        populate: typeof req.query.populate == 'string'
            ?
                req.query.populate.split(',').map((v) => v)
            : ['storyCollections'],
    };
    const myProfile = yield User_1.default.findById(userId).populate(populate);
    return res.json({
        status: 'ok',
        myProfile,
    });
}));
exports.default = getMe;
