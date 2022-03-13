"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storyMetaSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Story",
    },
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    likedBy: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },
        ],
        select: !false,
    },
    dislikedBy: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },
        ],
        select: !false,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
storyMetaSchema.virtual("like").get(function () {
    const storyMeta = this;
    return storyMeta.likedBy.length;
});
storyMetaSchema.virtual("dislike").get(function () {
    const storyMeta = this;
    return storyMeta.dislikedBy.length;
});
const StoryMetaModel = (0, mongoose_1.model)("StoryMeta", storyMetaSchema);
exports.default = StoryMetaModel;
