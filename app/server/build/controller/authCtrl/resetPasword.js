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
exports.resetPaswordPage = exports.resetPasword = void 0;
const path_1 = __importDefault(require("path"));
const createToken_1 = require("../../lib/createToken");
const utils_1 = require("../../lib/utils");
const User_1 = __importDefault(require("../../models/User"));
exports.resetPasword = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield (0, createToken_1.retriveToken)(req.params.resettoken);
    if (token.type != 'resetPassword')
        return next((0, utils_1.ErrorResponse)(400, 'Resource not found'));
    const user = yield User_1.default.findById(token.userId);
    if (!user) {
        return next((0, utils_1.ErrorResponse)(400, 'Resource not found'));
    }
    user.password = req.body.newPassword;
    yield user.save();
    yield token.delete();
    return res.json({
        status: 'ok',
        message: 'Password changed successfully',
    });
}));
exports.resetPaswordPage = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Content-Security-Policy', ` `);
    res.sendFile(path_1.default.join(__dirname, 'ResetPassword.html'));
}));
