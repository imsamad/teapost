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
exports.forgotIdentifierSchema = void 0;
const utils_1 = require("../../lib/utils");
const User_1 = __importDefault(require("../../models/User"));
const yup = __importStar(require("yup"));
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const forgotIdentifier = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { identifierInitials } = req.body;
    let users = yield User_1.default.find({
        $or: [
            { email: new RegExp(identifierInitials, 'gi') },
            { username: new RegExp(identifierInitials, 'gi') },
        ],
        isEmailVerified: true,
        isAuthorised: true,
    });
    if (!users.length) {
        return next((0, utils_1.ErrorResponse)(400, {
            identifierInitials: `No match found`,
        }));
    }
    let matchedIdentifiers = [];
    users.forEach(({ email, username }) => {
        if (email.match(new RegExp(identifierInitials, 'gi')))
            matchedIdentifiers.push(email);
        if (username.match(new RegExp(identifierInitials, 'gi')))
            matchedIdentifiers.push(username);
    });
    if (!matchedIdentifiers.length) {
        return next((0, utils_1.ErrorResponse)(400, {
            identifierInitials: `No match found`,
        }));
    }
    res.json({
        status: 'ok',
        matchedIdentifiers,
    });
}));
exports.forgotIdentifierSchema = yup.object({
    body: yup.object({
        identifierInitials: yup
            .string()
            .label('identifierInitials')
            .required('identifierInitials is required')
            .test('identifierInitials', 'identifierInitials must have atleast 3 chars.', (val) => {
            return (0, utils_1.trimInside)(val, 3);
        }),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.forgotIdentifierSchema), forgotIdentifier];
