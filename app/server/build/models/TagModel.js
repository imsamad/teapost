"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tagSchema = new mongoose_1.Schema({
    tag: {
        type: String,
        required: [true, "This tag already exist"],
        unique: true,
        trim: true,
        lowercase: true,
    },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
const TagModel = (0, mongoose_1.model)("Tag", tagSchema);
exports.default = TagModel;
