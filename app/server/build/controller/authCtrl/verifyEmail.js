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
const utils_2 = require("../../lib/utils");
const createToken_1 = require("../../lib/createToken");
const Profile_1 = __importDefault(require("../../models/Profile"));
const StoryCollection_1 = __importDefault(require("../../models/StoryCollection"));
const verifyEmail = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtCodedToken = req.params.token;
    const malliciousReq = (0, utils_2.ErrorResponse)(400, 'Mallicious request.');
    try {
        const token = yield (0, createToken_1.retriveToken)(jwtCodedToken);
        if (token.type == 'resetPassword')
            return next(malliciousReq);
        const user = yield User_1.default.findById(token.userId.toString());
        if (!user)
            return next(malliciousReq);
        if (token.type == 'verifyChangedEmail')
            user.email = token.newEmail;
        else if (token.type == 'verifyRegistration') {
            yield Profile_1.default.create({ _id: user._id.toString() });
            yield StoryCollection_1.default.create({
                user: user._id.toString(),
                title: 'Read Later',
            });
        }
        user.isEmailVerified = true;
        yield user.save();
        yield token.delete();
        res.status(200).json({
            status: 'ok',
            message: 'Email verfied successfully.',
        });
    }
    catch (err) {
        return next(malliciousReq);
    }
}));
exports.default = verifyEmail;
