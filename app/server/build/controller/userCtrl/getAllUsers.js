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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const utils_1 = require("../../lib/utils");
const User_1 = __importStar(require("../../models/User"));
exports.getAllUsers = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const page = parseInt(((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page) || 1, 10) || 1, limit = parseInt(((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.limit) || 10, 10) || 10;
    const startIndex = (page - 1) * limit;
    const usersDoc = yield User_1.default.find({
        isEmailVerified: true,
        isAuthorised: true,
    })
        .populate('profile')
        .skip(startIndex)
        .limit(limit);
    let pagination = { limit };
    if (usersDoc.length) {
        pagination.next = page + 1;
    }
    if (startIndex > 0)
        pagination.prev = page - 1;
    const isAdmin = ((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.role) == 'admin';
    res.json({
        status: 'ok',
        users: isAdmin ? usersDoc : usersDoc.map((user) => (0, User_1.peelUserDoc)(user)),
    });
}));
exports.default = exports.getAllUsers;
