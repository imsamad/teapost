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
exports.readAbleDate = exports.formatAMPM = exports.monthList = exports.sendTokens = exports.saveImageLocally = exports.validateYupSchema = exports.ErrorResponse = exports.trimInside = exports.typeOf = exports.createHash = exports.randomBytes = exports.readingTime = exports.getRndInteger = exports.asyncHandler = exports.lorem = exports.capitalFirst = void 0;
const slugify_1 = __importDefault(require("slugify"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const nanoid_1 = require("nanoid");
const html_to_text_1 = require("html-to-text");
const User_1 = require("../models/User");
const jwt_1 = require("./jwt");
const mongoose_1 = require("mongoose");
const lorem_ipsum_1 = require("lorem-ipsum");
const capitalFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
exports.capitalFirst = capitalFirst;
exports.lorem = new lorem_ipsum_1.LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.asyncHandler = asyncHandler;
function getRndInteger(min, max, include = false) {
    return Math.floor(Math.random() * (max - min + (include ? 1 : 0))) + min;
}
exports.getRndInteger = getRndInteger;
const readingTime = (html) => {
    if (!html)
        return 0;
    const string = (0, html_to_text_1.convert)(html, {
        wordwrap: 80,
    });
    const words = string.trim().split(/\s+/).length;
    const wpm = 200;
    const time = Math.ceil(words / wpm);
    return time;
};
exports.readingTime = readingTime;
const randomBytes = (num = 20) => crypto_1.default.randomBytes(num).toString('hex');
exports.randomBytes = randomBytes;
const createHash = (str) => crypto_1.default.createHash('sha256').update(str).digest('hex');
exports.createHash = createHash;
const typeOf = (val, type, label) => {
    const result = val == 'undefined' || typeof val == 'undefined'
        ? false
        : type == 'mongoId'
            ? (0, mongoose_1.isValidObjectId)(val)
            : val.constructor.name.toLowerCase() == type;
    if (label) {
        console.log('from typeOf ', label);
        console.log('val ', val.constructor.name.toLowerCase());
        console.log('type ', type);
        console.log('result ', result);
    }
    return result;
};
exports.typeOf = typeOf;
const trimInside = (str, minLength, maxLength = Infinity, joinBy = ' ') => {
    if (!str || typeof str != 'string')
        return false;
    let splitted = str.split(/\s/g);
    let filteredVoidStr = splitted.filter((val) => val !== '');
    let joined = filteredVoidStr.join(joinBy);
    return joined.length >= minLength && joined.length < maxLength ? true : false;
};
exports.trimInside = trimInside;
function ErrorResponse(statusCode, message) {
    if (!new.target)
        return new ErrorResponse(statusCode, message);
    this.statusCode = statusCode;
    this.message = message;
}
exports.ErrorResponse = ErrorResponse;
const validateYupSchema = (schema, data, abortEarly = false) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const res = yield schema.validate(data, { abortEarly });
        if (res)
            return true;
        else
            throw new Error('Provide proper data');
    }
    catch (yupError) {
        let errors = {};
        if ((_a = yupError === null || yupError === void 0 ? void 0 : yupError.inner) === null || _a === void 0 ? void 0 : _a.length) {
            (_b = yupError === null || yupError === void 0 ? void 0 : yupError.inner) === null || _b === void 0 ? void 0 : _b.forEach((inner) => {
                var _a;
                const key = inner.params.label || inner.params.path || inner.path;
                if (!((_a = errors[key]) === null || _a === void 0 ? void 0 : _a.length))
                    errors[key] = [];
                errors[key].push(...inner.errors);
            });
        }
        else {
            errors = {
                [((_c = yupError === null || yupError === void 0 ? void 0 : yupError.params) === null || _c === void 0 ? void 0 : _c.label) || yupError.params.path || yupError.path]: yupError.errors || yupError.message,
            };
        }
        throw Object.keys(errors).length ? errors : 'Provide proper data';
    }
});
exports.validateYupSchema = validateYupSchema;
const saveImageLocally = (file, appUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let fileName = (0, slugify_1.default)(path_1.default.parse(file.name).name);
        fileName = fileName + (0, nanoid_1.nanoid)(10) + path_1.default.extname(file.name);
        const savePath = path_1.default.join(__dirname, '../../', 'public', 'uploads', 'image', fileName);
        const res = yield file.mv(savePath);
        return Object.assign(Object.assign({}, res), { url: `${appUrl}/image/${fileName}`, result: true });
    }
    catch (err) {
        return { result: false };
    }
});
exports.saveImageLocally = saveImageLocally;
const sendTokens = (user, statusCode, res, message) => __awaiter(void 0, void 0, void 0, function* () {
    const resData = {
        status: 'ok',
        user: (0, User_1.peelUserDoc)(user),
        message,
        accessToken: (0, jwt_1.signJwt)({ user: user._id }),
    };
    return res.status(statusCode).json(resData);
});
exports.sendTokens = sendTokens;
exports.monthList = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var sec = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    sec = sec < 10 ? '0' + sec : sec;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
exports.formatAMPM = formatAMPM;
const readAbleDate = (value, isFull = true) => {
    let date = value;
    let d = date.getDate(), m = date.getMonth() + 1, y = date.getFullYear();
    d = d < 10 ? '0' + d : d;
    m = m < 10 ? '0' + m : m;
    let dmy = `${d}-${m}-${y}`;
    return !isFull ? dmy : `${dmy}, ${formatAMPM(date)}`;
};
exports.readAbleDate = readAbleDate;
