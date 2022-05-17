"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAbleToPublished = void 0;
const yup_1 = require("yup");
const utils_1 = require("../utils");
const mongoose_1 = require("mongoose");
exports.isAbleToPublished = (0, yup_1.object)({
    title: (0, yup_1.string)()
        .label('title')
        .required('Title is required.')
        .typeError('Title must be string.')
        .test('title', 'Title must have 10 char minimum.', (val) => (0, utils_1.trimInside)(val, 10)),
    titleImage: (0, yup_1.string)()
        .label('titleImage')
        .required('titleImage is required.')
        .url('titleImage must be url')
        .typeError('titleImage must be url'),
    subtitle: (0, yup_1.string)()
        .label('subtitle')
        .required('Subtitle is required')
        .typeError('Subtitle must be string')
        .test('subtitle', 'Subtitle must have 20 char minimum.', (val) => (0, utils_1.trimInside)(val, 20)),
    slug: (0, yup_1.string)()
        .label('slug')
        .required('Slug is required')
        .typeError('Slug must be string/url type'),
    tags: (0, yup_1.array)()
        .label('tags')
        .typeError('tags must of type array')
        .min(1, 'Mimimun one tag is required.')
        .test((val) => val && Array.isArray(val) ? val.every((v) => (0, mongoose_1.isValidObjectId)(v)) : false),
    content: (0, yup_1.string)()
        .label('content')
        .required('Content of story is required')
        .typeError('Content must be string/url type')
        .test('content', 'Content must have 2200 char minimum.', (val) => (0, utils_1.trimInside)(val, 2220)),
    keywords: (0, yup_1.string)()
        .label('keywords')
        .required('Keywords of story is required')
        .typeError('Keywords must be string/url type')
        .test('keywords', 'Keywords must have atleast 10 char minimum.', (val) => (0, utils_1.trimInside)(val, 10)),
});
