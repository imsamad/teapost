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
const createToken_1 = __importDefault(require("../../lib/createToken"));
const sendEmail_1 = __importDefault(require("../../lib/sendEmail"));
const utils_1 = require("../../lib/utils");
const User_1 = __importDefault(require("../../models/User"));
const updateDetails = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, newPassword, currentPassword, fullName, tagLines, profilePic, newEmail, } = req.body;
    const userId = req.user._id;
    let warnings = {};
    let query = User_1.default.findById(userId);
    if (currentPassword && newPassword)
        query.select('+password');
    let user = yield query;
    user.fullName = fullName !== null && fullName !== void 0 ? fullName : user === null || user === void 0 ? void 0 : user.fullName;
    user.tagLines = tagLines !== null && tagLines !== void 0 ? tagLines : user === null || user === void 0 ? void 0 : user.tagLines;
    user.profilePic = profilePic !== null && profilePic !== void 0 ? profilePic : user === null || user === void 0 ? void 0 : user.profilePic;
    const usernameAlreadyExist = () => new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        if (!username)
            return resolve(true);
        if (username && user.username == username) {
            user.username = req.user.username;
            resolve(false);
        }
        else {
            const alreadyExist = yield User_1.default.findOne({
                username,
                _id: { $nin: userId },
            });
            if (alreadyExist) {
                warnings.username = 'Username already registered';
                resolve(true);
            }
            else {
                user.username = username;
                resolve(false);
            }
        }
    }));
    const changePwd = () => new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        if (!currentPassword || !newPassword)
            resolve(true);
        else {
            if (yield user.matchPassword(currentPassword)) {
                user.password = newPassword;
                resolve(true);
            }
            else {
                warnings.password = 'Password does not match';
                resolve(false);
            }
        }
    }));
    yield usernameAlreadyExist();
    yield changePwd();
    const changeEmail = () => new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        if (!newEmail)
            return resolve(true);
        if (newEmail == user.email)
            return resolve(true);
        else {
            let alreadyExist = yield User_1.default.findOne({ email: newEmail });
            warnings.newEmail = {};
            if (alreadyExist) {
                warnings.newEmail.message = `${newEmail} already registered.`;
                return resolve(false);
            }
            const { redirectUrl, message, token } = yield (0, createToken_1.default)(req, {
                newEmail,
                type: 'verifyChangedEmail',
                userId: user._id,
            });
            let isEmailService = 'true' === process.env.IS_EMAIL_SERVICE;
            if (!isEmailService) {
                warnings.newEmail.redirectUrl = redirectUrl;
                warnings.newEmail.message = `Verify your email by visiting this link valid for ${process.env.TOKEN_EXPIRE}.`;
                return resolve(true);
            }
            let emailSentResult = yield (0, sendEmail_1.default)(user.email, redirectUrl, message);
            if (!emailSentResult) {
                yield token.delete();
                warnings.newEmail.messsage =
                    "Email can't  be changed right now, plz try again.";
                return resolve(false);
            }
            else {
                warnings.newEmail.redirectUrl = redirectUrl;
                warnings.newEmail.message = `Verify your email by visiting this link valid for ${process.env.TOKEN_EXPIRE}.`;
                return resolve(true);
            }
        }
    }));
    yield changeEmail();
    user = yield user.save();
    return (0, utils_1.sendTokens)(user, 200, res, warnings);
}));
exports.default = updateDetails;
