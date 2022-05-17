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
const primaryCommentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Author of comment is required.'],
        ref: 'User',
    },
    story: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Story',
    },
    text: {
        required: true,
        type: String,
        trim: true,
        min: [1, 'Enter some thing'],
    },
    noOfReplies: { type: Number, default: 0 },
    noOfLikes: { type: Number, default: 0 },
    noOfDislikes: { type: Number, default: 0 },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
primaryCommentSchema.virtual('secondary', {
    ref: 'Secondary',
    localField: '_id',
    foreignField: 'primary',
    justOne: false,
});
primaryCommentSchema.virtual('meta', {
    ref: 'CommentMeta',
    localField: '_id',
    foreignField: '_id',
    justOne: true,
});
primaryCommentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isNew)
            return next();
        yield this.model('Story').findByIdAndUpdate(this.story.toString(), {
            _id: this.story.toString(),
            $inc: { noOfComments: 1 },
        });
        next();
    });
});
primaryCommentSchema.pre('remove', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.model('CommentMeta').findByIdAndRemove(this._id);
        yield this.model('Story').findByIdAndUpdate(this.story.toString(), {
            $inc: { noOfComments: -1 },
        });
        let secondaryComments = yield this.model('Secondary').find({
            primary: this._id,
        });
        let secondaryCommentsPromise = secondaryComments.map((secondary) => secondary.remove());
        Promise.allSettled(secondaryCommentsPromise)
            .then((res) => { })
            .finally(() => {
            next();
        });
    });
});
const Primary = (0, mongoose_1.model)('Primary', primaryCommentSchema);
exports.default = Primary;
