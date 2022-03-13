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
exports.getProfile = void 0;
const utils_1 = require("../lib/utils");
const ProfileModel_1 = __importDefault(require("../models/ProfileModel"));
exports.getProfile = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    let query = ProfileModel_1.default.findOne({ user });
    if (req.query.populateStory)
        query.populate("likedStories dislikedStories");
    const profile = yield query;
    return res.json({
        status: "ok",
        profile,
    });
}));
