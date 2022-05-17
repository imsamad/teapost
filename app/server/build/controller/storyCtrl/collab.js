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
exports.schema = void 0;
const utils_1 = require("../../lib/utils");
const Profile_1 = __importDefault(require("../../models/Profile"));
const Story_1 = __importDefault(require("../../models/Story"));
const Yup = __importStar(require("yup"));
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const mongoose_1 = require("mongoose");
const ctrl = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let userId = req.user._id, addAuthors = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.addAuthors) || [], removeAuthors = ((_b = req.body) === null || _b === void 0 ? void 0 : _b.removeAuthors) || [];
    let story = yield Story_1.default.findById(req.params.storyId);
    if (!story || ((_c = story === null || story === void 0 ? void 0 : story.author) === null || _c === void 0 ? void 0 : _c.toString()) != userId)
        return next((0, utils_1.ErrorResponse)(400, 'Resource not found'));
    story.collabWith.addToSet(...addAuthors);
    story.collabWith.pull(...removeAuthors);
    story = yield story.save();
    let promises = [];
    addAuthors.forEach((id) => {
        promises.push(Profile_1.default.findByIdAndUpdate(id, {
            _id: id,
            $addToSet: { collabStories: story._id },
        }, {
            upsert: true,
        }));
    });
    removeAuthors.forEach((id) => {
        promises.push(Profile_1.default.findByIdAndUpdate(id, {
            _id: id,
            $pull: { collabStories: story._id },
        }, {
            upsert: true,
        }));
    });
    yield Promise.allSettled(promises);
    res.json({
        status: 'ok',
        story,
    });
}));
exports.schema = Yup.object({
    params: Yup.object({
        storyId: Yup.string()
            .label('storyId')
            .required()
            .typeError('StoryId must be string type.')
            .test('storyId', 'Story Id must be a valid', (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
    body: Yup.object()
        .shape({
        addAuthors: Yup.array()
            .label('addAuthors')
            .when('removeAuthors', {
            is: (removeAuthors) => !removeAuthors,
            then: Yup.array()
                .required('Collab with is required')
                .typeError('It must be valid author ID array')
                .label('addAuthors')
                .min(1)
                .of(Yup.string()
                .label('addAuthors')
                .typeError('It must be valid author ID')
                .test('addAuthors', 'It must be valid author id', (val) => (0, utils_1.typeOf)(val, 'mongoId'))),
        }),
        removeAuthors: Yup.array().when('addAuthors', {
            is: (addAuthors) => {
                return !addAuthors;
            },
            then: Yup.array()
                .required('Collab with is required')
                .typeError('It must be valid author ID array')
                .label('removeAuthors')
                .min(1)
                .of(Yup.string()
                .label('removeAuthors')
                .typeError('It must be valid author ID')
                .test('removeAuthors', 'It must be valid author id', (val) => (0, utils_1.typeOf)(val, 'mongoId'))),
        }),
    }, [['addAuthors', 'removeAuthors']])
        .label('body')
        .test('body', 'Provide valid addAuthors or removeAuthors authorIds.', (body) => {
        var _a;
        let addAuthors = (body === null || body === void 0 ? void 0 : body.addAuthors) || [], removeAuthors = (body === null || body === void 0 ? void 0 : body.removeAuthors) || [];
        if ((!removeAuthors.length && !addAuthors.length) ||
            ((_a = new Set([...addAuthors, ...removeAuthors])) === null || _a === void 0 ? void 0 : _a.size) !=
                (addAuthors === null || addAuthors === void 0 ? void 0 : addAuthors.length) + (removeAuthors === null || removeAuthors === void 0 ? void 0 : removeAuthors.length))
            return false;
        return true;
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.schema), ctrl];
