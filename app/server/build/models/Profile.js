"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const profileSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'User is required.'],
        ref: 'User',
    },
    likedStories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Story',
        },
    ],
    dislikedStories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Story',
        },
    ],
    following: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    followers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    collabStories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Story',
        },
    ],
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
profileSchema.virtual('storyCollections', {
    ref: 'StoryCollection',
    localField: '_id',
    foreignField: 'user',
    justOne: false,
});
const Profile = (0, mongoose_1.model)('Profile', profileSchema);
exports.default = Profile;
