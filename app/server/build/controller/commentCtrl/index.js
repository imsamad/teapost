"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getPrimaries_1 = __importDefault(require("./getPrimaries"));
const getSecondaries_1 = __importDefault(require("./getSecondaries"));
const createPrimary_1 = __importDefault(require("./createPrimary"));
const createSecondary_1 = __importDefault(require("./createSecondary"));
const updateOrDeleteComment_1 = __importDefault(require("./updateOrDeleteComment"));
const replyToSecondary_1 = __importDefault(require("./replyToSecondary"));
const likeOrDislike_1 = __importDefault(require("./likeOrDislike"));
exports.default = {
    getSecondaries: getSecondaries_1.default,
    likeOrDislike: likeOrDislike_1.default,
    replyToSecondary: replyToSecondary_1.default,
    updateOrDeleteComment: updateOrDeleteComment_1.default,
    getPrimaries: getPrimaries_1.default,
    createPrimary: createPrimary_1.default,
    createSecondary: createSecondary_1.default,
};
