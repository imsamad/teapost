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
const sendEmail_1 = __importDefault(require("../../lib/sendEmail"));
const createToken_1 = __importDefault(require("../../lib/createToken"));
const authSchema_1 = require("../../lib/schema/authSchema");
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const ctrl = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, fullName } = req.body;
    let alreadyExistUsernameOrEmail = yield User_1.default.findOne({ email });
    if (alreadyExistUsernameOrEmail) {
        return next((0, utils_1.ErrorResponse)(400, {
            email: `${email} already registered.`,
        }));
    }
    else {
        alreadyExistUsernameOrEmail = yield User_1.default.findOne({ username });
        if (alreadyExistUsernameOrEmail)
            return next((0, utils_1.ErrorResponse)(400, {
                username: `${username} already registered.`,
            }));
    }
    const newUser = yield User_1.default.create({
        username,
        email,
        password,
        fullName,
    });
    const tryAgain = (0, utils_1.ErrorResponse)(400, 'Unable to process your request please register again.');
    try {
        const { token, redirectUrl, message } = yield (0, createToken_1.default)(req, {
            type: 'verifyRegistration',
            userId: newUser._id,
            newEmail: email,
        });
        let isEmailService = 'true' === process.env.IS_EMAIL_SERVICE;
        if (isEmailService) {
            let emailSentResult = yield (0, sendEmail_1.default)(email, redirectUrl, message);
            if (!emailSentResult) {
                yield newUser.delete();
                yield token.delete();
                return next(tryAgain);
            }
        }
        let resObj = {
            status: 'ok',
            message: `Account created successfully, Verify your email sent to ${email} valid for  ${process.env.TOKEN_EXPIRE}.`,
        };
        if (!isEmailService)
            resObj = Object.assign(Object.assign({}, resObj), { redirectUrl, message: `Account created successfully, Verify your by visting link valid for  ${process.env.TOKEN_EXPIRE}.` });
        return res.json(resObj);
    }
    catch (err) {
        newUser && (yield newUser.delete());
        return next(tryAgain);
    }
}));
exports.default = [(0, validateSchemaMdlwr_1.default)(authSchema_1.registerSchema), ctrl];
