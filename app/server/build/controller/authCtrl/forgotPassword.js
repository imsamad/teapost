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
const createToken_1 = __importDefault(require("../../lib/createToken"));
const utils_1 = require("../../lib/utils");
const User_1 = __importDefault(require("../../models/User"));
const sendEmail_1 = __importDefault(require("../../lib/sendEmail"));
const yup = __importStar(require("yup"));
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const forgotPassword = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier } = req.body;
    let user = yield User_1.default.findOne({
        $or: [{ email: identifier }, { username: identifier }],
        isEmailVerified: true,
        isAuthorised: true,
    });
    if (!user)
        return next((0, utils_1.ErrorResponse)(400, {
            identifier: "We don't find any matching account.",
        }));
    const { redirectUrl, token, message } = yield (0, createToken_1.default)(req, {
        userId: user._id,
        type: 'resetPassword',
    });
    let isEmailService = 'true' === process.env.IS_EMAIL_SERVICE;
    if (isEmailService) {
        let emailSentResult = yield (0, sendEmail_1.default)(user.email, redirectUrl, message);
        if (!emailSentResult) {
            token && (yield token.delete());
        }
    }
    let resObj = {
        status: 'ok',
        message: `Change your password by visiting the link sent to ${user.email} valid for  ${process.env.TOKEN_EXPIRE}.`,
    };
    if (!isEmailService)
        resObj = Object.assign(Object.assign({}, resObj), { redirectUrl, message: `Change your password by visiting this link valid for ${process.env.TOKEN_EXPIRE}.` });
    return res.json(resObj);
}));
const schema = yup.object({
    body: yup.object({
        identifier: yup
            .string()
            .typeError('Identfier must be type of string')
            .min(3)
            .label('identifier')
            .required(),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(schema), forgotPassword];
