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
const utils_2 = require("../../lib/utils");
const Story_1 = __importDefault(require("../../models/Story"));
const StoryCollection_1 = __importDefault(require("../../models/StoryCollection"));
const yup = __importStar(require("yup"));
const mongoose_1 = require("mongoose");
const validateSchemaMdlwr_1 = __importDefault(require("../../middleware/validateSchemaMdlwr"));
const buildCollecion = (0, utils_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user._id;
    const { addToDefault, removeFromDefault, addTo, removeFrom, storyId } = req.body;
    const story = yield Story_1.default.findById(storyId);
    if (!story)
        return next((0, utils_2.ErrorResponse)(400, 'No resource found'));
    let updatePromise = [];
    if (addToDefault || removeFromDefault) {
        updatePromise.push(StoryCollection_1.default.findOneAndUpdate({
            user,
            title: new RegExp('^' + 'read later' + '$', 'i'),
        }, addToDefault
            ? { user, $addToSet: { stories: story._id } }
            : { user, $pull: { stories: story._id } }, {
            new: true,
            upsert: true,
        }));
    }
    if (addTo) {
        addTo.forEach((collId) => {
            updatePromise.push(StoryCollection_1.default.findOneAndUpdate({ _id: collId, user }, { _id: collId, user, $addToSet: { stories: story._id } }, { new: true, upsert: true }));
        });
    }
    if (removeFrom) {
        removeFrom.forEach((collId) => {
            updatePromise.push(StoryCollection_1.default.findOneAndUpdate({ _id: collId, user }, {
                _id: collId,
                user,
                $pull: { stories: story._id },
            }, { new: true, upsert: true }));
        });
    }
    Promise.allSettled(updatePromise)
        .then((upRes) => {
    })
        .catch((err) => { })
        .finally(() => {
        res.json({ status: 'ok' });
    });
}));
exports.schema = yup.object({
    body: yup
        .object()
        .shape({
        storyId: yup
            .string()
            .label('storyId')
            .test('storyId', 'Story ID must be valid id.', (val) => (0, mongoose_1.isValidObjectId)(val))
            .typeError('Story Id must be of type')
            .required(),
        addTo: yup
            .array()
            .of(yup
            .string()
            .label('addTo')
            .test('addTo', 'addTo must be valid id.', (val) => (0, mongoose_1.isValidObjectId)(val))
            .typeError('addTo collection must be valid mongoose id'))
            .typeError('addTo must be of array of valid collectionId array'),
        removeFrom: yup
            .array()
            .of(yup
            .string()
            .label('removeFrom')
            .test('removeFrom', 'removeFrom must be valid id.', (val) => (0, mongoose_1.isValidObjectId)(val))
            .typeError('removeFrom collection must be valid mongoose id'))
            .typeError('removeFrom must be of array of valid collectionId array'),
        addToDefault: yup
            .boolean()
            .label('addToDefault')
            .typeError('Express addToDefault in boolean'),
        removeFromDefault: yup
            .boolean()
            .label('removeFromDefault')
            .typeError('Express removeFromDefault in boolean'),
    })
        .label('body')
        .test('body', 'Provide valid & unique addTo & removeFrom collectionId ', (val) => {
        if ((val === null || val === void 0 ? void 0 : val.addTo) &&
            (val === null || val === void 0 ? void 0 : val.removeFrom) &&
            (val === null || val === void 0 ? void 0 : val.addToDefault) &&
            (val === null || val === void 0 ? void 0 : val.removeFromDefault))
            return false;
        let addToISArray = (0, utils_1.typeOf)(val === null || val === void 0 ? void 0 : val.addTo, 'array'), removeFromIsArray = (0, utils_1.typeOf)(val === null || val === void 0 ? void 0 : val.removeFrom, 'array');
        if (addToISArray && removeFromIsArray) {
            const total = [...val.removeFrom, ...val.addTo];
            return new Set(total).size === (total === null || total === void 0 ? void 0 : total.length);
        }
        return true;
    }),
});
exports.default = [(0, validateSchemaMdlwr_1.default)(exports.schema), buildCollecion];
