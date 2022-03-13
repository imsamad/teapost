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
exports.saveImageLocally = exports.validateYupSchema = exports.ErrorResponse = exports.trimExtra = exports.typeOf = exports.createHash = exports.randomBytes = exports.asyncHandler = void 0;
const slugify_1 = __importDefault(require("slugify"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const nanoid_1 = require("nanoid");
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.asyncHandler = asyncHandler;
const randomBytes = (num = 20) => crypto_1.default.randomBytes(num).toString("hex");
exports.randomBytes = randomBytes;
const createHash = (str) => crypto_1.default.createHash("sha256").update(str).digest("hex");
exports.createHash = createHash;
const typeOf = (val, type) => (!val ? false : val.constructor.name.toLowerCase() === type.toLowerCase());
exports.typeOf = typeOf;
const trimExtra = (str, length, join = " ") => {
    if (!str)
        return false;
    let splitted = str.split(" ");
    let filtered = splitted.filter((val) => val !== "");
    let joined = filtered.join(join);
    return joined.length >= length ? true : false;
};
exports.trimExtra = trimExtra;
const ErrorResponse = (statusCode, message) => {
    return { statusCode, message };
};
exports.ErrorResponse = ErrorResponse;
const validateYupSchema = (schema, data, abortEarly = false) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const res = yield schema.validate(data, { abortEarly });
        if (res)
            return true;
        else
            throw new Error("Provide proper data");
    }
    catch (yupError) {
        let finalError = {};
        let fieldsAddedToFinalError = Object.keys(finalError);
        if (!((_a = yupError === null || yupError === void 0 ? void 0 : yupError.inner) === null || _a === void 0 ? void 0 : _a.length)) {
            finalError = {
                [yupError.params.label || yupError.params.path]: yupError.errors || yupError.message,
            };
        }
        else {
            yupError.inner.forEach((error) => {
                const crntField = error.params.label || error.params.path;
                const isCrntFieldAddedToFinalErr = fieldsAddedToFinalError.includes(crntField);
                if (!isCrntFieldAddedToFinalErr) {
                    let errorOfCrntField = [];
                    yupError.inner.forEach((err) => {
                        const { params, errors } = err;
                        if (params.label == crntField || params.path == crntField)
                            errorOfCrntField.push(...errors);
                    });
                    finalError = Object.assign(Object.assign({}, finalError), { [crntField]: errorOfCrntField });
                }
            });
        }
        throw Object.keys(finalError).length ? finalError : "Provide proper data";
    }
});
exports.validateYupSchema = validateYupSchema;
const saveImageLocally = (file, appUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fileName = (0, slugify_1.default)(path_1.default.parse(file.name).name);
        fileName = fileName + (0, nanoid_1.nanoid)(10) + path_1.default.extname(file.name);
        const savePath = path_1.default.join(__dirname, "../../", "public", "uploads", "image", fileName);
        const res = yield file.mv(savePath);
        return Object.assign(Object.assign({}, res), { url: `${appUrl}/image/${fileName}`, result: true });
    }
    catch (err) {
        return { result: false };
    }
});
exports.saveImageLocally = saveImageLocally;
