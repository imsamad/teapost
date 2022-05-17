"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assetCtrl_1 = require("../controller/assetCtrl");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.default)();
router.route(['/upload', '/']).post(auth_1.protect, assetCtrl_1.uploadAssets);
router.route(['/', '/my']).get(auth_1.protect, assetCtrl_1.getMyAssets);
exports.default = router;
