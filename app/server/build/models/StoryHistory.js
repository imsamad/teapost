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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseDoc = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const storyHistorySchema = new mongoose_1.Schema({
    instances: [{ story: String, createdAt: Date }],
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
});
const StoryHistory = mongoose_1.default.model('StoryHistory', storyHistorySchema);
exports.default = StoryHistory;
const ParseDoc = (storyHistory) => {
    let storyHistoryJSON = storyHistory === null || storyHistory === void 0 ? void 0 : storyHistory.toJSON();
    let { instances = [], _v } = storyHistoryJSON, rest = __rest(storyHistoryJSON, ["instances", "_v"]);
    instances = instances === null || instances === void 0 ? void 0 : instances.map((_a) => {
        var { story, _v } = _a, rest = __rest(_a, ["story", "_v"]);
        return (Object.assign(Object.assign({}, rest), { story: JSON.parse(story) }));
    });
    return Object.assign(Object.assign({}, rest), { instances });
};
exports.ParseDoc = ParseDoc;
