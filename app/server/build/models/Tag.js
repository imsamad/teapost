"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = require("../lib/utils");
const tagSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Tag title is required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
tagSchema.post('save', function (error, doc, next) {
    if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        next((0, utils_1.ErrorResponse)(400, {
            title: `${doc.title || 'This tag'} already present.`,
        }));
    }
    else {
        next(error);
    }
});
const Tag = (0, mongoose_1.model)('Tag', tagSchema);
exports.default = Tag;
