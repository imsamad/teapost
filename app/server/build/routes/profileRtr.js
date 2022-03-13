"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileCtrl_1 = require("../controller/profileCtrl");
const router = (0, express_1.default)();
const auth_1 = require("../middleware/auth");
router.route("/:userId").get(auth_1.protect, (0, auth_1.authorise)(["admin"]), profileCtrl_1.getProfile);
exports.default = router;
