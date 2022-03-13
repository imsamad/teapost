"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    isPrimary: Boolean,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Author of comment is required."],
        ref: "User",
    },
    story: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Story",
    },
    text: {
        type: String,
        min: [0, "Enter some thing"],
    },
    replyTo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
const StoryModel = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = StoryModel;
