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
exports.authorise = exports.protect = exports.fetchAuth = void 0;
const jwt_1 = require("../lib/jwt");
const utils_1 = require("../lib/utils");
const User_1 = __importDefault(require("../models/User"));
function fetchAuth(req, res, next) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)
            return next();
        let token = false;
        if ((_c = (_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization) === null || _c === void 0 ? void 0 : _c.startsWith('Bearer '))
            token = (_d = req.headers.authorization.split(' ')) === null || _d === void 0 ? void 0 : _d[1];
        if (!token || token == 'undefined')
            return next();
        token = (0, jwt_1.decodeJwt)(token);
        if (!token)
            return next();
        const user = yield User_1.default.findById(token.user).lean();
        if (!user)
            return next();
        if (!(user === null || user === void 0 ? void 0 : user.isAuthorised) || !(user === null || user === void 0 ? void 0 : user.isEmailVerified))
            return next();
        req.user = user;
        next();
    });
}
exports.fetchAuth = fetchAuth;
const assert = (req, res, next) => {
    var _a;
    if ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id)
        next();
    else
        return next((0, utils_1.ErrorResponse)(400, `Not authorized to access this route.`));
};
exports.protect = [fetchAuth, assert];
const authorise = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next((0, utils_1.ErrorResponse)(400, `Not authorized to access this route`));
        next();
    };
};
exports.authorise = authorise;
