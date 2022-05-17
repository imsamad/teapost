"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tagCtrl_1 = __importDefault(require("../controller/tagCtrl"));
const router = (0, express_1.default)();
router.route('/').get(tagCtrl_1.default.getAllTags).post(tagCtrl_1.default.createTags);
exports.default = router;
