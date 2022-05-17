"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storyCollectionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User is required.'],
        ref: 'User',
    },
    stories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Story',
        },
    ],
    title: { type: String, required: true },
    description: String,
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
const StoryCollection = (0, mongoose_1.model)('StoryCollection', storyCollectionSchema);
exports.default = StoryCollection;
