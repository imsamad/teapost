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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCollectionSchema = exports.updateCollectionSchema = exports.createCollectionSchema = void 0;
const yup = __importStar(require("yup"));
const utils_1 = require("../utils");
const mongoose_1 = require("mongoose");
exports.createCollectionSchema = yup.object({
    body: yup.object({
        title: yup
            .string()
            .label("title")
            .required("Title is required")
            .typeError("Title must be string.")
            .test("title", "Title must be above 1 chars.", (val) => (0, utils_1.trimExtra)(val, 1)),
        description: yup
            .string()
            .label("description")
            .typeError("Description must be string.")
            .test("description", "Description must be above 1 chars.", (val) => {
            return typeof val === "undefined" ? true : (0, utils_1.trimExtra)(val, 1);
        }),
        isPublic: yup
            .boolean()
            .label("isPublic")
            .typeError("isPublic must be a boolean value"),
        stories: yup
            .array()
            .label("stories")
            .typeError("Stories must be array")
            .test("stories", "Stories must be valid", (val) => !val ? true : val.every((v) => (0, mongoose_1.isValidObjectId)(v))),
    }),
});
exports.updateCollectionSchema = yup.object({
    body: yup
        .object({
        title: yup
            .string()
            .label("title")
            .typeError("Title must be string.")
            .test("title", "Title must be above 1 chars.", (val) => !val ? true : (0, utils_1.trimExtra)(val, 1)),
        description: yup
            .string()
            .label("description")
            .typeError("Description must be string.")
            .test("description", "Description must be above 1 chars.", (val) => typeof val === "undefined" ? true : (0, utils_1.trimExtra)(val, 1)),
        isPublic: yup
            .boolean()
            .label("isPublic")
            .typeError("isPublic must be a boolean value"),
        stories: yup
            .array()
            .label("stories")
            .typeError("Stories must be array")
            .test("stories", "Stories must be valid", (val) => !val ? true : val.every((v) => (0, mongoose_1.isValidObjectId)(v))),
    })
        .label("body")
        .test("body", "Provide respective data", (val) => {
        return (val === null || val === void 0 ? void 0 : val.title) ||
            (val === null || val === void 0 ? void 0 : val.description) ||
            (0, utils_1.typeOf)(val === null || val === void 0 ? void 0 : val.stories, "array") ||
            typeof (val === null || val === void 0 ? void 0 : val.isPublic) !== "undefined"
            ? true
            : false;
    }),
});
exports.removeCollectionSchema = yup.object({
    params: yup.object({
        collectionId: yup
            .string()
            .label("collectionId")
            .required("Collection Id is required")
            .typeError("collection must be valid id")
            .test("collectionId", "Provide valid collection id", (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
});
