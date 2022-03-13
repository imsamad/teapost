"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAbleToPublished = exports.gradeStorySchema = exports.likeOrDislikeSchema = exports.createStorySchema = exports.publishedStorySchema = exports.changeSlugSchema = void 0;
const mongoose_1 = require("mongoose");
const yup_1 = require("yup");
const utils_1 = require("../utils");
exports.changeSlugSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        slug: (0, yup_1.string)()
            .label("slug")
            .typeError("It must be string")
            .required("It is required"),
        id: (0, yup_1.string)()
            .label("id")
            .required("id is required")
            .typeError("id must be string")
            .test("id", "It is not valid id.", (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
});
exports.publishedStorySchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        storyId: (0, yup_1.string)()
            .label("storyId")
            .required("Story id is required")
            .test("id", "story id is invalid.", (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
    body: (0, yup_1.object)({
        isPublished: (0, yup_1.boolean)()
            .nullable()
            .label("isPublished")
            .typeError("Only boolean values are allowed"),
    }),
});
exports.createStorySchema = (0, yup_1.object)({
    body: (0, yup_1.object)().shape({
        title: (0, yup_1.string)().label("title").typeError("title must be string"),
        subtitle: (0, yup_1.string)().label("subtitle").typeError("subtitle must be string"),
        tags: (0, yup_1.array)().label("tags").typeError("tags must be array"),
        body: (0, yup_1.string)().label("body").typeError("body must be string"),
        keywords: (0, yup_1.string)().label("keywords").typeError("keyword must be string"),
        additionalTags: (0, yup_1.array)()
            .label("additionalTags")
            .typeError("additionalTags must be array of string"),
        id: (0, yup_1.string)()
            .label("id")
            .when("slug", {
            is: (slug) => !slug,
            then: (0, yup_1.string)()
                .required("id is required")
                .test("id", "It is not valid id.", (val) => (0, mongoose_1.isValidObjectId)(val)),
        }),
        isPublished: (0, yup_1.boolean)()
            .nullable()
            .label("isPublished")
            .typeError("Only boolean values are allowed"),
        slug: (0, yup_1.string)()
            .label("slug")
            .typeError("Slug must be string type")
            .when("id", {
            is: (id) => !id,
            then: (0, yup_1.string)().required("Slug is required"),
        }),
    }, [["slug", "id"]]),
});
exports.likeOrDislikeSchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        storyId: (0, yup_1.string)()
            .label("storyId")
            .required("Story Id is required")
            .typeError("Story Id must be string")
            .test("storyId", "StoryId is not valid id.", (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
});
exports.gradeStorySchema = (0, yup_1.object)({
    params: (0, yup_1.object)({
        storyId: (0, yup_1.string)()
            .label("storyId")
            .required("Story Id is required")
            .typeError("Story Id must be string")
            .test("storyId", "StoryId is not valid id.", (val) => (0, mongoose_1.isValidObjectId)(val)),
    }),
    body: (0, yup_1.object)().shape({
        like: (0, yup_1.number)()
            .label("like")
            .typeError("Express like in number(1,-1)")
            .when("dislike", {
            is: (dislike) => typeof dislike === "undefined",
            then: (0, yup_1.number)().required("Like or dislike is required"),
        }),
        dislike: (0, yup_1.number)()
            .label("dislike")
            .typeError("Express dislike in number(1,-1)")
            .when("like", {
            is: (like) => typeof like === "undefined",
            then: (0, yup_1.number)().required("Like or dislike is required"),
        }),
    }, [["like", "dislike"]]),
});
const stringSchema = (label, minLength, maxLength) => {
    let minLengthMsg = `Min length for ${label} is ${minLength} chars`;
    let maxLengthMsg = `Max length ${label} is ${maxLength} chars`;
    return (0, yup_1.string)()
        .trim()
        .min(minLength, minLengthMsg)
        .max(maxLength, maxLengthMsg)
        .required(`${label} is required`)
        .test(label, minLengthMsg, (val) => {
        const res = (0, utils_1.trimExtra)(val, minLength);
        return res;
    })
        .label(label)
        .typeError(`${label} must be string`);
};
exports.isAbleToPublished = (0, yup_1.object)({
    title: stringSchema("title", 10, 90),
    titleImage: (0, yup_1.string)()
        .label("titleImage")
        .required("titleImage is required.")
        .url("titleImage must be url")
        .typeError("titleImage must be url"),
    subtitle: stringSchema("subtitle", 10, 175),
    slug: (0, yup_1.string)()
        .required("slug is required to create a story")
        .label("slug")
        .typeError("slug must be string"),
    tags: (0, yup_1.array)()
        .min(1, "Minimum one tag is required.")
        .required("Minimum one tag is required")
        .label("tags")
        .typeError("tags must be array type"),
    keywords: stringSchema("keywords", 10, 150),
});
function notRequiredStringSchema(label, minLength, maxLength) {
    let msg = `${label} length must be`;
    maxLength !== Infinity
        ? (msg += ` between ${minLength} & ${maxLength} chars`)
        : (msg += ` above ${minLength} chars`);
    return (0, yup_1.string)()
        .nullable()
        .optional()
        .trim()
        .test(label, msg, (val) => !val
        ? true
        : (0, utils_1.trimExtra)(val, minLength) && stringLength(val, minLength, maxLength))
        .label(label)
        .typeError(`${label} must be string`);
}
function stringLength(str, min, max) {
    return !str ? false : str.length < max && str.length > min;
}
