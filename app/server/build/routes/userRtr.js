"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userCtrl_1 = require("../controller/userCtrl");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.default)();
router.route('/').get(auth_1.fetchAuth, userCtrl_1.getAllUsers);
exports.default = router;
