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
const secondaryCommentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Author of comment is required.'],
        ref: 'User',
    },
    text: {
        type: String,
        trim: true,
        min: [1, 'Enter some thing'],
    },
    primary: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Author of comment is required.'],
        ref: 'Primary',
    },
    secondary: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Secondary',
    },
    secondaryUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    noOfLikes: { type: Number, default: 0 },
    noOfDislikes: { type: Number, default: 0 },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
secondaryCommentSchema.virtual('meta', {
    ref: 'CommentMeta',
    localField: '_id',
    foreignField: '_id',
    justOne: true,
});
secondaryCommentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isNew)
            return next();
        const primary = yield this.model('Primary').findByIdAndUpdate(this.primary.toString(), { $inc: { noOfReplies: 1 } });
        yield this.model('Story').findByIdAndUpdate(primary.story, {
            $inc: { noOfComments: 1 },
        });
        next();
    });
});
secondaryCommentSchema.pre('remove', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.model('CommentMeta').findByIdAndRemove(this._id);
        const primary = yield this.model('Primary').findByIdAndUpdate(this.primary.toString(), {
            $inc: { noOfReplies: -1 },
        });
        yield this.model('Story').findByIdAndUpdate(primary.story, {
            $inc: { noOfComments: -1 },
        });
        next();
    });
});
const Secondary = (0, mongoose_1.model)('Secondary', secondaryCommentSchema);
exports.default = Secondary;
