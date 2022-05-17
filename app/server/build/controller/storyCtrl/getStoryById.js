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
exports.ctrl = void 0;
const yup_1 = require("yup");
const mongoose_1 = require("mongoose");
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const utils_1 = require("../../lib/utils");
const Story_1 = __importDefault(require("../../models/Story"));
exports.ctrl = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const story = yield Story_1.default.findById(req.params.storyId).lean();
    if (story === null || story === void 0 ? void 0 : story.isPublished) {
        return res.json({
            status: 'ok',
            story,
        });
    }
    else {
        const user = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (user &&
            (user == (story === null || story === void 0 ? void 0 : story.author.toString()) ||
                (story === null || story === void 0 ? void 0 : story.collabWith.map((id) => id.toString()).includes(user))))
            return res.json({
                status: 'ok',
                story,
            });
        else {
            return res.status(400).json({
                status: 'error',
                story: null,
                message: `Story not exist with id ${req.params.storyId}`,
            });
        }
    }
}));
const schema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        storyId: (0, yup_1.string)()
            .label('storyId')
            .required()
            .typeError('StoryId must be string type.')
            .test('storyId', 'Story Id must be a valid', (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(schema), exports.ctrl];
