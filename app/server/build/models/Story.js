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
exports.storyAllowedFields = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../lib/utils");
exports.storyAllowedFields = [
    'title',
    'subtitle',
    'titleImage',
    'slug',
    'tags',
    'content',
    'keywords',
];
const storySchema = new mongoose_1.Schema({
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
                ref: 'Tag',
            },
        ],
    },
    content: String,
    keywords: {
        type: String,
        trim: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Author of story is required.'],
        ref: 'User',
    },
    collabWith: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    isPublished: {
        type: Boolean,
        require: true,
        default: false,
    },
    hadEmailedToFollowers: {
        type: Boolean,
        default: false,
        select: true,
    },
    isPublishedByAdmin: {
        type: Boolean,
        require: [
            true,
            'Specifying the story, Is published or not is compulsary.',
        ],
        default: true,
    },
    readingTime: { type: Number, default: 0 },
    noOfViews: { type: Number, default: 0 },
    noOfComments: { type: Number, default: 0 },
    noOfLikes: { type: Number, default: 0 },
    noOfDislikes: { type: Number, default: 0 },
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});
storySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isNew)
            return next();
        let user = yield this.model('User').findById(this.author);
        if (!user) {
            next((0, utils_1.ErrorResponse)(400, {
                message: 'Not authorised',
            }));
            return;
        }
        user = yield this.model('User').findOneAndUpdate({ _id: this.author }, { $inc: { stories: 1 } });
        next();
    });
});
storySchema.post(['save', 'updateOne'], errorHandlerMdlwr);
storySchema.post('findOneAndUpdate', errorHandlerMdlwr);
function errorHandlerMdlwr(error, doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
                next((0, utils_1.ErrorResponse)(400, {
                    slug: `${(doc === null || doc === void 0 ? void 0 : doc.slug) || 'This slug'} already have story associted.`,
                }));
            }
            else {
                next('error');
            }
        }
        else {
            next(error);
        }
    });
}
storySchema.virtual('meta', {
    ref: 'StoryMeta',
    localField: '_id',
    foreignField: '_id',
    justOne: true,
});
storySchema.virtual('comments', {
    ref: 'Primary',
    localField: '_id',
    foreignField: 'story',
    justOne: false,
});
storySchema.pre('remove', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        let deletedPrimary = yield this.model('Primary').find({
            story: this._id,
        });
        let promises = [];
        promises.push(this.model('StoryMeta').findByIdAndRemove(this._id));
        promises.push(this.model('StoryHistory').findByIdAndRemove(this._id));
        promises.push(this.model('User').findOneAndUpdate({ _id: this.author }, { $inc: { stories: -1 } }));
        deletedPrimary.forEach((primary, index) => promises.push(primary.remove()));
        Promise.allSettled(promises)
            .then((res) => { })
            .finally(() => {
            next();
        });
    });
});
const Story = (0, mongoose_1.model)('Story', storySchema);
exports.default = Story;
