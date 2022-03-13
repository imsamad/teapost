"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const collectionCtrl_1 = require("../controller/collectionCtrl");
const auth_1 = require("../middleware/auth");
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const collection_1 = require("../lib/schema/collection");
router.post("/", auth_1.protect, (0, validateSchema_1.default)(collection_1.createCollectionSchema), collectionCtrl_1.createCollection);
router
    .route("/:collectionId")
    .put(auth_1.protect, (0, validateSchema_1.default)(collection_1.updateCollectionSchema), collectionCtrl_1.updateCollection)
    .delete(auth_1.protect, (0, validateSchema_1.default)(collection_1.removeCollectionSchema), collectionCtrl_1.removeCollection);
exports.default = router;
