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
exports.getAllImageFromCloudinary = exports.uploadImageToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const nanoid_1 = require("nanoid");
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImageToCloudinary = (data, publicId, resource_type = 'image') => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadResponse = yield cloudinary.uploader.upload(data, {
            resource_type,
            public_id: `${publicId}` || `teapost_${(0, nanoid_1.nanoid)(5)}`,
            folder: 'teapost',
            tags: [publicId],
        });
        return uploadResponse;
    }
    catch (err) {
        console.log('error from uploadImageToCloudinary', err);
        throw err;
    }
});
exports.uploadImageToCloudinary = uploadImageToCloudinary;
const getAllImageFromCloudinary = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resources } = yield cloudinary.api.resources({
            all: true,
            type: 'upload',
            max_results: 200,
            prefix: 'avatar',
        });
        console.log('resources.length ', resources.length);
        return { resources: resources, result: true };
    }
    catch (err) {
        console.log('err from getAllImageFromCloudinary ', err);
        return err;
    }
});
exports.getAllImageFromCloudinary = getAllImageFromCloudinary;
