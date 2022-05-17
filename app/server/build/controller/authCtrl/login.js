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
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const authSchema_1 = require("../../lib/schema/authSchema");
const logIn = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifier, password } = req.body;
    let user = yield User_1.default.findOne({
        $or: [{ email: identifier }, { username: identifier }],
        isEmailVerified: true,
        isAuthorised: true,
    }).select('+password');
    if (!user)
        return next((0, utils_2.ErrorResponse)(400, {
            identifier: 'Identifier not registered/verfied .',
        }));
    const isPwdMatch = yield user.matchPassword(password);
    if (!isPwdMatch)
        return next((0, utils_2.ErrorResponse)(400, { password: 'Password is wrong.' }));
    if (!user.isAuthorised)
        return next((0, utils_2.ErrorResponse)(400, 'Not authorised!'));
    (0, utils_1.sendTokens)(user, 200, res);
}));
exports.default = [(0, validateSchemaMdlwr_1.default)(authSchema_1.logInSchema), logIn];
