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
exports.removeCollection = exports.updateCollection = exports.createCollection = void 0;
const utils_1 = require("../lib/utils");
const StoryCollectionModel_1 = __importDefault(require("../models/StoryCollectionModel"));
exports.createCollection = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const isExist = yield StoryCollectionModel_1.default.find({
        title: new RegExp("^" + req.body.title + "$", "i"),
        user,
    });
    if (isExist.length)
        return next((0, utils_1.ErrorResponse)(400, `Already exist with title ${req.body.title}`));
    const collection = yield StoryCollectionModel_1.default.create(Object.assign({ user }, req.body));
    return res.json({ status: "ok", collection });
}));
exports.updateCollection = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const user = req.user._id;
    let collection = yield StoryCollectionModel_1.default.findOne({
        _id: req.params.collectionId,
        user,
    });
    if (!collection)
        return next((0, utils_1.ErrorResponse)(404, "Resource not found"));
    collection.isPublic = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.isPublic) || collection.isPublic;
    collection.title = ((_b = req.body) === null || _b === void 0 ? void 0 : _b.title) || collection.title;
    collection.description = ((_c = req.body) === null || _c === void 0 ? void 0 : _c.description) || collection.description;
    collection.stories = ((_d = req.body) === null || _d === void 0 ? void 0 : _d.stories) || collection.stories;
    collection = yield collection.save();
    return res.json({ status: "ok", collection });
}));
exports.removeCollection = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield StoryCollectionModel_1.default.findOne({
        _id: req.params.collectionId,
        user: req.user,
    });
    if ((collection === null || collection === void 0 ? void 0 : collection.title.toLowerCase()) == "read later")
        return next((0, utils_1.ErrorResponse)(402, "Read more cannot be removed"));
    if (!collection)
        return next((0, utils_1.ErrorResponse)(400, "Resource not found."));
    yield collection.delete();
    return res.json({
        status: "ok",
        message: "Deleted",
    });
}));
