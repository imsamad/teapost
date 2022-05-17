"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllTags_1 = __importDefault(require("./getAllTags"));
const createTags_1 = __importDefault(require("./createTags"));
exports.default = { getAllTags: getAllTags_1.default, createTags: createTags_1.default };
