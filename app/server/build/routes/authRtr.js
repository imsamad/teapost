"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const authCtrl_1 = require("../controller/authCtrl");
const auth_1 = require("../middleware/auth");
const validateSchema_1 = __importDefault(require("../middleware/validateSchema"));
const auth_2 = require("../lib/schema/auth");
router.post("/login", (0, validateSchema_1.default)(auth_2.logInSchema), authCtrl_1.logIn);
router.post("/register", (0, validateSchema_1.default)(auth_2.registerSchema), authCtrl_1.register);
router.get("/verifyemail", authCtrl_1.verifyEmail);
router.get("/me", auth_1.protect, authCtrl_1.getMe);
router
    .route("/unfollow/:authorId")
    .put(auth_1.protect, (0, validateSchema_1.default)(auth_2.followSchema), (0, authCtrl_1.followAuthor)(false));
router
    .route("/follow/:authorId")
    .put(auth_1.protect, (0, validateSchema_1.default)(auth_2.followSchema), (0, authCtrl_1.followAuthor)(true));
router
    .route("/collection/add/:storyId")
    .put(auth_1.protect, (0, validateSchema_1.default)(auth_2.addToCollectionSchema), authCtrl_1.addToCollection);
exports.default = router;
