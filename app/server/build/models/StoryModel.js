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
const mongoose_1 = require("mongoose");
const utils_1 = require("../lib/utils");
const storySchema = new mongoose_1.Schema({
    data: Object,
    title: {
        type: String,
        trim: true,
    },
    titleImage: String,
    subtitle: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    tags: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "Tag",
            },
        ],
    },
    body: String,
    keywords: {
        type: String,
        trim: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Author of story is required."],
        ref: "User",
    },
    isPublished: {
        type: Boolean,
        require: true,
        default: false,
    },
    isPublishedByAdmin: {
        type: Boolean,
        require: [
            true,
            "Specifying the story, Is published or not is compulsary.",
        ],
        default: true,
        select: false,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
storySchema.post(["save", "updateOne"], errorHandlerMdlwr);
storySchema.post("findOneAndUpdate", errorHandlerMdlwr);
function errorHandlerMdlwr(error, doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
                next((0, utils_1.ErrorResponse)(400, {
                    slug: `This slug already registered.`,
                }));
            }
            else {
                next((0, utils_1.ErrorResponse)(400, "Invalid data."));
            }
        }
        else {
            next(error);
        }
    });
}
storySchema.virtual("meta", {
    ref: "StoryMeta",
    localField: "_id",
    foreignField: "_id",
    justOne: true,
});
const StoryModel = (0, mongoose_1.model)("Story", storySchema);
exports.default = StoryModel;
