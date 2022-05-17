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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pagination_1 = __importDefault(require("../../lib/pagination"));
const utils_1 = require("../../lib/utils");
const Story_1 = __importDefault(require("../../models/Story"));
const User_1 = require("../../models/User");
const getAllStories = (0, utils_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let replace = [
        ['likes', 'noOfLikes'],
        ['dislikes', 'noOfDislikes'],
        ['views', 'noOfViews'],
        ['comments', 'noOfComments'],
        ['tag', 'tags'],
        ['authors', 'author'],
    ];
    const id = req.query.id || req.query._id;
    let queryClone = JSON.stringify(req.query);
    let query = {};
    if (id) {
        queryClone = JSON.stringify({});
        query._id = id;
    }
    queryClone = queryClone.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
    replace.forEach((repl) => {
        queryClone = queryClone.replace(new RegExp(repl[0]), (match) => `${repl[1]}`);
    });
    queryClone = JSON.parse(queryClone);
    const searchable = {
        title: 'RegEx',
        subtitle: 'RegEx',
        keywords: 'RegEx',
        content: 'RegEx',
        slug: 'string',
        tags: 'mongoId',
        author: 'mongoId',
        collabWith: 'mongoId',
        readingTime: 'operator',
        noOfLikes: 'operator',
        noOfDislikes: 'operator',
        noOfViews: 'operator',
        noOfComments: 'operator',
    };
    const types = {
        operator: [
            'readingTime',
            'noOfLikes',
            'noOfDislikes',
            'noOfViews',
            'noOfComments',
        ],
        mongoId: ['tags', 'author', 'collabWith'],
        regEx: ['title', 'subtitle', 'content', 'keywords'],
        string: ['slug'],
    };
    Object.keys(queryClone).forEach((field) => {
        var _a, _b;
        if (!(field in searchable))
            return;
        const fieldValue = queryClone[field];
        const isStr = (0, utils_1.typeOf)(fieldValue, 'string');
        const type = searchable[field];
        switch (type) {
            case 'RegEx':
                if (!isStr)
                    break;
                query.$or = (_a = query.$or) !== null && _a !== void 0 ? _a : [];
                query.$or.push({ [field]: new RegExp(`${fieldValue}`, 'gi') });
                break;
            case 'string':
                if (!isStr)
                    break;
                query[field] = fieldValue;
                break;
            case 'mongoId':
                if (isStr) {
                    const ids = fieldValue
                        .split(',')
                        .filter((id) => (0, mongoose_1.isValidObjectId)(id));
                    if (ids.length)
                        query[field] = (_b = query[field]) !== null && _b !== void 0 ? _b : { $in: ids };
                }
                else {
                    for (const keys in fieldValue) {
                        if (typeof fieldValue[keys] == 'string')
                            fieldValue[keys] = fieldValue[keys].split(',');
                        else
                            delete fieldValue[keys];
                    }
                    if (Object.keys(fieldValue).length)
                        query[field] = fieldValue;
                }
                break;
            case 'operator':
                if (isStr) {
                    query[field] = fieldValue;
                }
                else
                    for (const keys in fieldValue) {
                        if (typeof fieldValue[keys] == 'string')
                            fieldValue[keys] = fieldValue[keys];
                        else
                            delete fieldValue[keys];
                    }
                if (Object.keys(fieldValue).length)
                    query[field] = fieldValue;
                break;
        }
    });
    let queryRef = Story_1.default.find(Object.assign(Object.assign({}, query), { isPublished: true, isPublishedByAdmin: true, hadEmailedToFollowers: true }));
    let populate = [
        {
            path: 'meta',
        },
        {
            path: 'collabWith',
            transform: (v) => (0, User_1.peelUserDoc)(v),
        },
        {
            path: 'author',
            transform: (v) => (0, User_1.peelUserDoc)(v),
        },
        {
            path: 'tags',
            select: 'title',
        },
    ];
    let commentPopulate = {
        path: 'comments',
        populate: [
            {
                path: 'user',
                transform: (v) => (0, User_1.peelUserDoc)(v),
            },
            {
                path: 'secondary',
                populate: [
                    {
                        path: 'user',
                        transform: (v) => (0, User_1.peelUserDoc)(v),
                    },
                    {
                        path: 'secondaryUser',
                        transform: (v) => (0, User_1.peelUserDoc)(v),
                    },
                ],
            },
        ],
    };
    queryRef.populate(populate).lean();
    let populateComment = typeof req.query.populate == 'string'
        ? (_a = req.query.populate) === null || _a === void 0 ? void 0 : _a.includes('comment')
        : false;
    populateComment && queryRef.populate(commentPopulate);
    let selectContent = typeof req.query.select == 'string'
        ? (_b = req.query.select) === null || _b === void 0 ? void 0 : _b.includes('content')
        : false;
    if (selectContent)
        queryRef.select('content');
    else
        queryRef.select('-content');
    (0, pagination_1.default)(req, res, {
        query: queryRef,
        label: 'stories',
    });
}));
exports.default = getAllStories;
