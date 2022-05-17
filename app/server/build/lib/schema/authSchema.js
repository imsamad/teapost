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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followSchema = exports.verifyEmailSchema = exports.logInSchema = exports.registerSchema = void 0;
const yup = __importStar(require("yup"));
const yup_password_1 = __importDefault(require("yup-password"));
(0, yup_password_1.default)(yup);
const utils_1 = require("../utils");
const emailField = yup
    .string()
    .email('Must be a valid email')
    .required('Email is required')
    .label('email');
const pwdField = yup
    .string()
    .password()
    .minSymbols(1, 'Password must contain one symbol')
    .minUppercase(1, 'Password must contain one uppercase letter')
    .required('password is required')
    .label('password');
const pwdConfirmField = yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .label('passwordConfirmation')
    .typeError('passwordConfirmation must be string');
exports.registerSchema = yup.object({
    body: yup.object({
        username: yup
            .string()
            .label('username')
            .typeError('username must be string type.')
            .required()
            .min(4),
        fullName: yup
            .string()
            .label('fullName')
            .typeError('fullName must be string type.')
            .required()
            .min(4),
        email: emailField,
        password: pwdField,
        passwordConfirmation: pwdConfirmField,
    }),
});
exports.logInSchema = yup.object({
    body: yup.object({
        identifier: yup
            .string()
            .label('identifier')
            .typeError('identifier must be string type.')
            .required(),
        password: yup
            .string()
            .label('password')
            .typeError('password must be string type.')
            .required(),
    }),
});
exports.verifyEmailSchema = yup.object({
    query: yup.object({
        token: yup
            .string()
            .label('token')
            .typeError('password must be string type.')
            .required(),
    }),
});
exports.followSchema = yup.object({
    params: yup.object({
        authorId: yup
            .string()
            .label('authorId')
            .typeError('StoryId must be valid.')
            .required()
            .test('storyId', 'StoryId must be valid.', (val) => (0, utils_1.typeOf)(val, 'mongoId')),
    }),
});
