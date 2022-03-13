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
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUpload = void 0;
const cloudinary_1 = require("../lib/cloudinary");
const utils_1 = require("../lib/utils");
exports.imageUpload = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.files.image;
    const response = yield (0, cloudinary_1.uploadImageToCloudinary)(file.tempFilePath);
    if (!response.result)
        return next((0, utils_1.ErrorResponse)(400, 'Unable to upload Image'));
    res.status(200).json({ status: 'ok', data: { imageUrl: response.url } });
}));
