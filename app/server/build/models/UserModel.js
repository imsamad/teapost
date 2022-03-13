"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../lib/utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Please add a name"],
        minlength: [5, "Username's minimum length must be 5."],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password's minimum length must be 6."],
        select: false,
    },
    role: {
        type: String,
        enum: ["admin", "reader", "author"],
        default: "reader",
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isAuthorised: {
        type: Boolean,
        default: true,
        required: true,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
UserSchema.post("save", function (error, doc, next) {
    if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        next((0, utils_1.ErrorResponse)(400, {
            email: `${doc.email || "This email"} already registered.`,
        }));
    }
    else {
        next(error);
    }
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return next();
        const saltFactor = Number(process.env.SALT_FACTOR) || 10;
        const salt = yield bcrypt_1.default.genSalt(saltFactor);
        const hash = yield bcrypt_1.default.hashSync(user.password, salt);
        user.password = hash;
        return next();
    });
});
UserSchema.methods.matchPassword = function (enterPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enterPassword, this.password);
    });
};
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
