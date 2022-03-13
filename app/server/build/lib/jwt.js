"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ms_1 = __importDefault(require("ms"));
const jwtSecret = process.env.JWT_SECRET;
const jwtExpire = process.env.JWT_EXPIRE;
const jwtExpireRefresh = process.env.JWT_EXPIRE_REFRESH;
const jwtIssuer = process.env.JWT_ISSUER;
const jwtGlobalOptions = (expiresIn) => {
    return {
        issuer: jwtIssuer,
        expiresIn: expiresIn ? (0, ms_1.default)(expiresIn) : (0, ms_1.default)(jwtExpire),
    };
};
const signJwt = (data, options) => {
    return jsonwebtoken_1.default.sign(data, jwtSecret, Object.assign(Object.assign({}, jwtGlobalOptions(options === null || options === void 0 ? void 0 : options.expiresIn)), options));
};
exports.signJwt = signJwt;
const decodeJwt = (token, options) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret, Object.assign(Object.assign({}, jwtGlobalOptions(options === null || options === void 0 ? void 0 : options.expiresIn)), options));
        return decoded;
    }
    catch (error) {
        console.log('Error from jwt decode ', error);
        return false;
    }
};
exports.decodeJwt = decodeJwt;
