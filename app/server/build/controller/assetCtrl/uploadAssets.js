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
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("../../lib/cloudinary");
const utils_1 = require("../../lib/utils");
const Asset_1 = __importDefault(require("../../models/Asset"));
const uploadAssets = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    if (!((_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.data))
        return next((0, utils_1.ErrorResponse)(400, 'Provide data'));
    const data = Array.isArray((_b = req.files) === null || _b === void 0 ? void 0 : _b.data)
        ? (_c = req.files) === null || _c === void 0 ? void 0 : _c.data
        : [(_d = req.files) === null || _d === void 0 ? void 0 : _d.data];
    const limitFileSize = parseInt(process.env.LIMIT_FILE_SIZE, 10);
    let uploaders = data
        .filter((file) => (file === null || file === void 0 ? void 0 : file.size) < limitFileSize)
        .map((file) => {
        const resource_type = file.mimetype.includes('video')
            ? 'video'
            : file.mimetype.includes('image')
                ? 'image'
                : 'raw';
        const publicId = path_1.default.parse(file.name).name;
        return (0, cloudinary_1.uploadImageToCloudinary)(file === null || file === void 0 ? void 0 : file.tempFilePath, publicId, resource_type);
    });
    if (!uploaders.length)
        return next((0, utils_1.ErrorResponse)(400, `Files size exceeded ${limitFileSize} bytes`));
    const responses = yield Promise.allSettled(uploaders);
    let assetUploaded = {};
    let isAllFailed = true;
    responses.forEach((response) => {
        if (response.status == 'fulfilled') {
            isAllFailed = false;
            const resource_type = response.value.resource_type + 's';
            if (!assetUploaded[resource_type])
                assetUploaded[resource_type] = [];
            assetUploaded[resource_type].push({
                public_id: response.value.public_id,
                url: response.value.secure_url,
                tags: response.value.tags,
            });
        }
    });
    if (isAllFailed)
        return next((0, utils_1.ErrorResponse)(400, 'Invalid files format.'));
    const user = req.user._id;
    let assetInstane = { $push: {} };
    if (assetUploaded.images)
        assetInstane.$push.images = assetUploaded.images;
    if (assetUploaded.videos)
        assetInstane.$push.videos = assetUploaded.videos;
    if (assetUploaded.raws)
        assetInstane.$push.raws = assetUploaded.raws;
    const saved = yield Asset_1.default.findByIdAndUpdate(user, Object.assign({ _id: user }, assetInstane), { upsert: true, new: true });
    return res.status(200).json({ assetUploaded });
}));
exports.default = uploadAssets;
