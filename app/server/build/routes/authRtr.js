"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const router = (0, express_1.default)();
const authCtrl_1 = __importDefault(require("../controller/authCtrl"));
const auth_1 = require("../middleware/auth");
router.post('/register', authCtrl_1.default.register);
router.get(['/verifyRegistration/:token', '/verifyChangedEmail/:token'], authCtrl_1.default.verifyEmail);
router.post('/login', authCtrl_1.default.logIn);
router.post('/forgotpassword', authCtrl_1.default.forgotPassword);
router
    .route('/resetpassword/:resettoken')
    .get((0, helmet_1.default)({
    contentSecurityPolicy: false,
}), authCtrl_1.default.resetPaswordPage)
    .put(authCtrl_1.default.resetPasword);
router.get('/forgotidentifier', authCtrl_1.default.forgotIdentifier);
router.post('/forgotidentifier', authCtrl_1.default.forgotIdentifier);
router.use(auth_1.protect);
router.get(['/me', '/'], authCtrl_1.default.getMe);
router.put(['/changeemail', '/updateemail'], authCtrl_1.default.changeEmail);
router.put(['/', '/update'], authCtrl_1.default.updateDetails);
router.patch(['/follow/:authorId', '/unfollow/:authorId'], authCtrl_1.default.followAuthor);
exports.default = router;
