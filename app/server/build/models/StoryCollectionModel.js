"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storyCollectionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User is required."],
        ref: "User",
    },
    stories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Story",
        },
    ],
    title: { type: String, dropDups: true },
    description: String,
    isPublic: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
storyCollectionSchema.index({ user: 1, title: 1 }, { unique: true });
storyCollectionSchema.index({ title: 1, isPublic: 1 }, { partialFilterExpression: { isPublic: true }, unique: true });
const StoryCollectionModel = (0, mongoose_1.model)("StoryCollection", storyCollectionSchema);
exports.default = StoryCollectionModel;
