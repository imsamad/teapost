"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("./login"));
const register_1 = __importDefault(require("./register"));
const verifyEmail_1 = __importDefault(require("./verifyEmail"));
const getMe_1 = __importDefault(require("./getMe"));
const followAuthor_1 = __importDefault(require("./followAuthor"));
const changeEmail_1 = __importDefault(require("./changeEmail"));
const updateDetails_1 = __importDefault(require("./updateDetails"));
const forgotPassword_1 = __importDefault(require("./forgotPassword"));
const forgotIdentifier_1 = __importDefault(require("./forgotIdentifier"));
const resetPasword_1 = require("./resetPasword");
exports.default = {
    logIn: login_1.default,
    register: register_1.default,
    verifyEmail: verifyEmail_1.default,
    getMe: getMe_1.default,
    followAuthor: followAuthor_1.default,
    resetPaswordPage: resetPasword_1.resetPaswordPage,
    resetPasword: resetPasword_1.resetPasword,
    forgotPassword: forgotPassword_1.default,
    changeEmail: changeEmail_1.default,
    updateDetails: updateDetails_1.default,
    forgotIdentifier: forgotIdentifier_1.default,
};
