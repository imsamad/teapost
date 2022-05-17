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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.peelUserDoc = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../lib/utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
    },
    profilePic: String,
    username: {
        type: String,
        required: [true, 'Please add a name'],
        minlength: [4, "Username's minimum length must be 4."],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: [6, "Password's minimum length must be 6."],
        select: false,
    },
    tagLines: [String],
    role: {
        type: String,
        enum: ['admin', 'reader', 'author'],
        default: 'reader',
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
    following: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    stories: { type: Number, default: 0, required: true },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
userSchema.post('save', function (error, doc, next) {
    if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        next((0, utils_1.ErrorResponse)(400, {
            email: `${doc.email || 'This email'} already registered.`,
        }));
    }
    else {
        next(error);
    }
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password'))
            return next();
        const saltFactor = Number(process.env.SALT_FACTOR) || 10;
        const salt = yield bcrypt_1.default.genSalt(saltFactor);
        const hash = yield bcrypt_1.default.hashSync(user.password, salt);
        user.password = hash;
        return next();
    });
});
userSchema.methods.matchPassword = function (enterPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enterPassword, this.password);
    });
};
userSchema.virtual('profile', {
    ref: 'Profile',
    localField: '_id',
    foreignField: '_id',
    justOne: true,
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
const peelUserDoc = (user) => {
    let copyUser = (user === null || user === void 0 ? void 0 : user.toObject) ? user === null || user === void 0 ? void 0 : user.toObject() : user;
    let { isEmailVerified, isAuthorised, updatedAt, password, id, __v } = copyUser, rest = __rest(copyUser, ["isEmailVerified", "isAuthorised", "updatedAt", "password", "id", "__v"]);
    let filteredUser = Object.assign({}, rest);
    if (copyUser === null || copyUser === void 0 ? void 0 : copyUser.profile) {
        const _a = copyUser.profile, { collabStories, storyCollections, dislikedStories, likedStories } = _a, rest = __rest(_a, ["collabStories", "storyCollections", "dislikedStories", "likedStories"]);
        filteredUser.profile = rest;
    }
    return filteredUser;
};
exports.peelUserDoc = peelUserDoc;
