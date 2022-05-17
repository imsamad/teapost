"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.updateCollection = void 0;
const utils_1 = require("../../lib/utils");
const StoryCollection_1 = __importDefault(require("../../models/StoryCollection"));
const yup = __importStar(require("yup"));
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
exports.updateCollection = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = req.user._id;
    let collection = yield StoryCollection_1.default.findOne({
        _id: req.params.collectionId,
        user,
    });
    if (!collection)
        return next((0, utils_1.ErrorResponse)(404, 'Resource not found'));
    collection.title = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.title) || collection.title;
    collection.description = ((_b = req.body) === null || _b === void 0 ? void 0 : _b.description) || collection.description;
    collection.stories = ((_c = req.body) === null || _c === void 0 ? void 0 : _c.stories) || collection.stories;
    collection = yield collection.save();
    return res.json({ status: 'ok', collection });
}));
const schema = yup.object({
    body: yup.object({
        title: yup
            .string()
            .label('title')
            .typeError('Title must be of type string'),
        description: yup
            .string()
            .label('description')
            .typeError('Description must be of type string'),
        stories: yup
            .array()
            .of(yup
            .string()
            .label('stories')
            .test('stories', 'Stories must be valid ids', (val) => {
            return (0, utils_1.typeOf)(val, 'mongoId');
        }))
            .label('stories')
            .typeError('Stories must be of type array of valid storyId'),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(schema), exports.updateCollection];
