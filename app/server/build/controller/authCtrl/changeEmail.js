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
const changeEmail = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newEmail = req.body.newEmail, user = req.user;
    let alreadyExist = yield User_1.default.findOne({ email: newEmail });
    if (alreadyExist)
        next((0, utils_1.ErrorResponse)(400, {
            newEmail: `${newEmail} already registered.`,
        }));
    const { redirectUrl, message, token } = yield (0, createToken_1.default)(req, {
        newEmail,
        type: 'verifyChangedEmail',
        userId: user._id,
    });
    let isEmailService = 'true' === process.env.IS_EMAIL_SERVICE;
    if (isEmailService) {
        let emailSentResult = yield (0, sendEmail_1.default)(user.email, redirectUrl, message);
        if (!emailSentResult) {
            yield token.delete();
        }
    }
    let resObj = {
        status: 'ok',
        message: `Verify your email by visiting the link sent to ${user.email}.`,
    };
    if (!isEmailService)
        resObj = Object.assign(Object.assign({}, resObj), { redirectUrl, message: `Verify your email by visiting this link valid for 10min.` });
    return res.json(resObj);
}));
exports.default = changeEmail;
