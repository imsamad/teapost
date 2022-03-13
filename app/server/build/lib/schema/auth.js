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
exports.addToCollectionSchema = exports.followSchema = exports.verifyEmailSchema = exports.logInSchema = exports.registerSchema = void 0;
const yup = __importStar(require("yup"));
const mongoose_1 = require("mongoose");
const yup_password_1 = __importDefault(require("yup-password"));
(0, yup_password_1.default)(yup);
const utils_1 = require("../utils");
const usernameField = yup
    .string()
    .typeError("username must be string")
    .label("username")
    .required("Username is required")
    .test("username", "Username must be above 4 chars.", (val) => (0, utils_1.trimExtra)(val, 4));
const emailField = yup
    .string()
    .email("Must be a valid email")
    .required("Email is required")
    .label("email");
const pwdField = yup
    .string()
    .password()
    .minSymbols(1, "Password must contain one symbol")
    .minUppercase(1, "Password must contain one uppercase letter")
    .required("password is required")
    .label("password");
const pwdConfirmField = yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .label("passwordConfirmation")
    .typeError("passwordConfirmation must be string");
exports.registerSchema = yup.object({
    body: yup.object({
        username: usernameField,
        email: emailField,
        password: pwdField,
        passwordConfirmation: pwdConfirmField,
    }),
});
exports.logInSchema = yup.object({
    body: yup.object({
        email: emailField,
        password: yup.string().required("Password is required").label("password"),
    }),
});
exports.verifyEmailSchema = yup.object({
    query: yup.object({
        token: yup.string().required("Mallicious request.").label("data"),
    }),
});
exports.followSchema = yup.object({
    params: yup.object({
        authorId: yup
            .string()
            .label("authorId")
            .required("Author is required")
            .typeError("Author Id must be string")
            .test("authorId", "Author is not valid.", (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
});
exports.addToCollectionSchema = yup.object({
    params: yup.object({
        storyId: yup
            .string()
            .required("Story Id is required")
            .label("storyId")
            .typeError("StoryId must valid string")
            .test("storyId", "Story is not valid", (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
    body: yup
        .object()
        .shape({
        addTo: yup
            .array()
            .label("addTo")
            .typeError("Provide list of collection")
            .test("addTo", "Provide valid collections", (val) => {
            return !val
                ? true
                : (0, utils_1.typeOf)(val, "array")
                    ? new Set(val).size === val.length &&
                        val.every((v) => (0, mongoose_1.isValidObjectId)(v))
                    : false;
        }),
        removeFrom: yup
            .array()
            .label("removeFrom")
            .typeError("Provide list of collection toremove from")
            .test("removeFrom", "Provide valid collections", (val) => {
            return !val
                ? true
                : (0, utils_1.typeOf)(val, "array")
                    ? new Set(val).size === val.length &&
                        val.every((v) => (0, mongoose_1.isValidObjectId)(v))
                    : false;
        }),
        addToDefault: yup
            .boolean()
            .label("addToDefault")
            .typeError("Express addToDefault in boolean"),
        removeFromDefault: yup
            .boolean()
            .label("removeFromDefault")
            .typeError("Express removeFromDefault in boolean"),
    })
        .label("body")
        .test("body ", "Provide valid & unique collections list to add & remove", (val) => {
        var _a, _b;
        if (typeof (val === null || val === void 0 ? void 0 : val.addTo) === "undefined" &&
            typeof (val === null || val === void 0 ? void 0 : val.removeFrom) === "undefined" &&
            typeof (val === null || val === void 0 ? void 0 : val.addToDefault) === "undefined" &&
            typeof (val === null || val === void 0 ? void 0 : val.removeFromDefault) === "undefined")
            return false;
        let isAddArray = (0, utils_1.typeOf)(val === null || val === void 0 ? void 0 : val.addTo, "array"), isRemoveArray = (0, utils_1.typeOf)(val === null || val === void 0 ? void 0 : val.removeFrom, "array");
        if (isAddArray && isRemoveArray)
            return (new Set([...val.addTo, ...val.removeFrom]).size ===
                ((_a = val.removeFrom) === null || _a === void 0 ? void 0 : _a.length) + ((_b = val.addTo) === null || _b === void 0 ? void 0 : _b.length));
        return true;
    }),
});
