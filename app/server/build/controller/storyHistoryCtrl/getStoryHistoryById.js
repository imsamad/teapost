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
exports.scehma = exports.getStoryHistoryById = void 0;
const utils_1 = require("../../lib/utils");
const Story_1 = __importDefault(require("../../models/Story"));
const StoryHistory_1 = __importDefault(require("../../models/StoryHistory"));
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const yup = __importStar(require("yup"));
exports.getStoryHistoryById = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const storyExist = yield Story_1.default.findById(req.params.storyId);
    if (!storyExist || storyExist.author.toString() != req.user._id)
        return next((0, utils_1.ErrorResponse)(400, 'No resource found'));
    let storyHistory = yield StoryHistory_1.default.findById(req.params.storyId);
    res.send({
        status: 'ok',
        storyHistory: storyHistory
            ? storyHistory
                .toJSON()
                .instances.filter((instance) => instance._id == req.params.historyId)
            : {},
    });
}));
exports.scehma = yup.object({
    params: yup.object({
        storyId: yup
            .string()
            .label('storyId')
            .required('Story Id is required')
            .typeError('storyId must be a valid id')
            .test('storyId', 'Story Id must be a valid id', (val) => (0, utils_1.typeOf)(val, 'mongoId')),
        historyId: yup
            .string()
            .label('historyId')
            .required('History Id is required')
            .typeError('historyId must be a valid id')
            .test('historyId', 'History Id must be a valid id', (val) => (0, utils_1.typeOf)(val, 'mongoId')),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.scehma), exports.getStoryHistoryById];
