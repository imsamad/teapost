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
exports.retriveToken = void 0;
const Token_1 = __importDefault(require("../models/Token"));
const jwt_1 = require("./jwt");
const utils_1 = require("./utils");
const messages = {
    resetPassword: `You are receiving this email because you (or someone else) has requested the reset of a password.`,
    verifyChangedEmail: `You are receiving this email because you (or someone else) has requested to change your email.`,
    verifyRegistration: `You are receiving this email because you need to confirm your email address.`,
};
const createToken = (req, token) => __awaiter(void 0, void 0, void 0, function* () {
    let newToken;
    try {
        const verifyToken = (0, utils_1.randomBytes)(20);
        const hashedVerifyToken = (0, utils_1.createHash)(verifyToken);
        const jwtVerifyToken = (0, jwt_1.signJwt)({ token: verifyToken }, process.env.JWT_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE,
        });
        newToken = yield Token_1.default.create(Object.assign({ token: hashedVerifyToken }, token));
        const redirectUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/${newToken.type}/${jwtVerifyToken}`;
        return { redirectUrl, token: newToken, message: messages[newToken.type] };
    }
    catch (err) {
        console.log('error while  creating token ', err);
        if (newToken)
            yield newToken.delete();
        throw new Error('Unable to process your request please try again.');
    }
});
const retriveToken = (jwtCodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token: decodedVerifyToken } = (0, jwt_1.decodeJwt)(jwtCodedToken, process.env.JWT_TOKEN_SECRET);
        if (!decodedVerifyToken)
            throw new Error('No token exist');
        const hashedVerifyToken = (0, utils_1.createHash)(decodedVerifyToken);
        let token = yield Token_1.default.findOne({
            token: hashedVerifyToken,
        });
        if (!token)
            throw new Error('No token exist');
        return token;
    }
    catch (err) {
        console.log('Error from retriveToken ', err);
        throw new Error('No token exist');
    }
});
exports.retriveToken = retriveToken;
exports.default = createToken;
