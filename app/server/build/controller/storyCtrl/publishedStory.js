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
exports.schema = void 0;
const utils_1 = require("../../lib/utils");
const Story_1 = __importDefault(require("../../models/Story"));
const storySchema_1 = require("../../lib/schema/storySchema");
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const yup_1 = require("yup");
const mongoose_1 = require("mongoose");
const ctrl = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const isPublish = req.originalUrl.startsWith('/publish');
    let story = yield Story_1.default.findById(req.params.storyId).select('+hadEmailedToFollowers');
    if (!story)
        return next((0, utils_1.ErrorResponse)(400, 'No resources found with this id.'));
    if (!isPublish) {
        story.isPublished = false;
        story = yield story.save();
        return res.status(200).json({ status: 'ok', story });
    }
    try {
        yield (0, utils_1.validateYupSchema)(storySchema_1.isAbleToPublished, story);
        story.isPublished = (_a = req.body.isPublished) !== null && _a !== void 0 ? _a : true;
        if (!story.hadEmailedToFollowers) {
            story.hadEmailedToFollowers = true;
        }
        story = yield story.save();
        return res.status(200).json({ status: 'ok', story });
    }
    catch (err) {
        return next((0, utils_1.ErrorResponse)(400, err));
    }
}));
exports.schema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        storyId: (0, yup_1.string)()
            .label('storyId')
            .required()
            .typeError('StoryId must be string type.')
            .test('storyId', 'Story Id must be a valid', (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.schema), ctrl];
