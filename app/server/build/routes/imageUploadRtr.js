"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageUploadCtrl_1 = require("../controller/imageUploadCtrl");
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const imageUpload_1 = require("../lib/schema/imageUpload");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.default)();
router
    .route("/upload")
    .post(auth_1.protect, (0, validateSchema_1.default)(imageUpload_1.imageUploadSchema), imageUploadCtrl_1.imageUpload);
exports.default = router;
