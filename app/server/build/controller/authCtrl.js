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
exports.addToCollection = exports.followAuthor = exports.getMe = exports.verifyEmail = exports.logIn = exports.register = void 0;
const utils_1 = require("../lib/utils");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const sendVerifyEmail_1 = __importDefault(require("../lib/sendVerifyEmail"));
const utils_2 = require("../lib/utils");
const jwt_1 = require("../lib/jwt");
const TokenModel_1 = __importDefault(require("../models/TokenModel"));
const ProfileModel_1 = __importDefault(require("../models/ProfileModel"));
const StoryModel_1 = __importDefault(require("../models/StoryModel"));
const StoryCollectionModel_1 = __importDefault(require("../models/StoryCollectionModel"));
exports.register = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const alreadyExist = yield UserModel_1.default.findOne({ email });
    if (alreadyExist)
        next((0, utils_2.ErrorResponse)(400, {
            email: `${email} already registered.`,
        }));
    const newUser = new UserModel_1.default({
        username,
        email,
        password,
    });
    const user = yield newUser.save();
    const verifyToken = (0, utils_2.randomBytes)(20);
    const hashedVerifyToken = (0, utils_2.createHash)(verifyToken);
    const jwtVerifyToken = (0, jwt_1.signJwt)({ token: verifyToken });
    const token = yield TokenModel_1.default.create({
        emailVerifyToken: hashedVerifyToken,
        userId: user.id || user._id,
    });
    if (!token || !verifyToken || !hashedVerifyToken || !jwtVerifyToken) {
        yield user.delete();
        if (token)
            yield token.delete();
        return next((0, utils_2.ErrorResponse)(400, "Unable to process your request please register again."));
    }
    const redirectUrl = `${req.protocol}://${req.get("host")}/api/v1/auth/verifyemail?token=${jwtVerifyToken}`;
    let isEmailService = process.env
        .IS_EMAIL_SERVICE;
    isEmailService = isEmailService === "true";
    if (isEmailService) {
        let emailSentResult = yield (0, sendVerifyEmail_1.default)(email, redirectUrl);
        if (!emailSentResult) {
            yield user.delete();
            yield token.delete();
            return next((0, utils_2.ErrorResponse)(400, "Unable to process your request please register again."));
        }
    }
    yield ProfileModel_1.default.create({ _id: user._id });
    yield StoryCollectionModel_1.default.create({ user: user._id, title: "Read Later" });
    let resObj = {
        status: "ok",
        message: `Account created successfully, Verify your email sent to ${email}.`,
    };
    if (!isEmailService)
        resObj = Object.assign(Object.assign({}, resObj), { redirectUrl });
    return res.json(resObj);
}));
exports.logIn = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield UserModel_1.default.findOne({ email }).select("+password");
    if (!user)
        return next((0, utils_2.ErrorResponse)(400, { email: "Email not registered." }));
    const isPwdMatch = yield user.matchPassword(password);
    if (!isPwdMatch)
        return next((0, utils_2.ErrorResponse)(400, { password: "Password is wrong." }));
    if (!user.isAuthorised)
        return next((0, utils_2.ErrorResponse)(400, "Not authorised!"));
    user.password = "";
    sendTokens(user, 200, res);
}));
exports.verifyEmail = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtCodedToken = req.query.token;
    const malliciousReq = (0, utils_2.ErrorResponse)(400, "Mallicious request.");
    if (!jwtCodedToken)
        return next(malliciousReq);
    const { token: decodedVerifyToken } = (0, jwt_1.decodeJwt)(jwtCodedToken);
    if (!decodedVerifyToken)
        return next(malliciousReq);
    const hashedVerifyToken = (0, utils_2.createHash)(decodedVerifyToken);
    let token = yield TokenModel_1.default.findOne({
        emailVerifyToken: hashedVerifyToken,
    });
    if (!token)
        return next(malliciousReq);
    const userId = token.userId;
    const user = yield UserModel_1.default.findById(userId);
    if (!user)
        return next(malliciousReq);
    user.isEmailVerified = true;
    yield user.save();
    yield token.delete();
    res.status(200).json({
        status: "ok",
        message: "Email verfied successfully.",
    });
}));
const sendTokens = (user, statusCode, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resData = {
        status: "ok",
        user: {
            _id: user._id,
            email: user.email,
            accessToken: (0, jwt_1.signJwt)({ user: user._id }, {
                expiresIn: "7d",
            }),
            username: user.username,
            role: user.role,
        },
    };
    return res.status(statusCode).json(resData);
});
exports.getMe = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    let query = ProfileModel_1.default.findById(user).populate("storyCollections");
    if (req.query.populateStory)
        query.populate("likedStories dislikedStories");
    const profile = yield query.lean();
    return res.json({
        status: "ok",
        profile: (profile === null || profile === void 0 ? void 0 : profile._id)
            ? profile
            : {
                _id: (profile === null || profile === void 0 ? void 0 : profile._id) || (profile === null || profile === void 0 ? void 0 : profile.id),
                likedStories: profile === null || profile === void 0 ? void 0 : profile.likedStories,
                dislikedStories: profile === null || profile === void 0 ? void 0 : profile.dislikedStories,
            },
    });
}));
const followAuthor = (toDoFollow) => (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let author = yield ProfileModel_1.default.findById(req.params.authorId);
    const userId = req.user._id.toString();
    if (!author || author._id.toString() == userId) {
        return next((0, utils_2.ErrorResponse)(400, "No resouce found"));
    }
    const user = yield ProfileModel_1.default.findByIdAndUpdate(userId, toDoFollow
        ? { $addToSet: { following: author._id } }
        : { $pull: { following: author._id } }, {
        new: true,
        upsert: true,
    });
    author = yield author.update(toDoFollow
        ? { $addToSet: { followers: user._id } }
        : { $pull: { followers: user._id } });
    return res.json({
        status: "ok",
        profile: user,
    });
}));
exports.followAuthor = followAuthor;
exports.addToCollection = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const story = yield StoryModel_1.default.findById(req.params.storyId);
    if (!story)
        return next((0, utils_2.ErrorResponse)(400, "No resource found"));
    const { addToDefault, removeFromDefault, addTo, removeFrom } = req.body;
    let updatePromise = [];
    if (addToDefault || removeFromDefault) {
        updatePromise.push(StoryCollectionModel_1.default.findOneAndUpdate({
            user,
            title: new RegExp("^" + "read later" + "$", "i"),
        }, addToDefault
            ? { user, $addToSet: { stories: story._id } }
            : { user, $pull: { stories: story._id } }, {
            new: true,
            upsert: true,
        }));
    }
    if (addTo) {
        addTo.forEach((collId) => {
            updatePromise.push(StoryCollectionModel_1.default.findOneAndUpdate({ _id: collId, user }, {
                $push: { stories: story._id },
            }, { new: true }));
        });
    }
    if (removeFrom) {
        removeFrom.forEach((collId) => {
            updatePromise.push(StoryCollectionModel_1.default.findOneAndUpdate({ _id: collId, user }, {
                $pull: { stories: story._id },
            }, { new: true }));
        });
    }
    Promise.allSettled(updatePromise)
        .then((upRes) => { })
        .catch((err) => { })
        .finally(() => {
        res.json({ status: "ok" });
    });
}));
