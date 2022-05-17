"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getStoryHistory_1 = __importDefault(require("./getStoryHistory"));
const getStoryHistoryById_1 = __importDefault(require("./getStoryHistoryById"));
const deleteStoryHistoryById_1 = __importDefault(require("./deleteStoryHistoryById"));
exports.default = { getStoryHistory: getStoryHistory_1.default, getStoryHistoryById: getStoryHistoryById_1.default, deleteStoryHistoryById: deleteStoryHistoryById_1.default };
