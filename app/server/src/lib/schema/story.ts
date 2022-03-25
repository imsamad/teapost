import { isValidObjectId } from "mongoose";
import { array, boolean, number, object, string } from "yup";
import { trimExtra } from "../utils";

export const changeSlugSchema = object({
  body: object({
    slug: string()
      .label("slug")
      .typeError("It must be string")
      .required("It is required"),
    id: string()
      .label("id")
      .required("id is required")
      .typeError("id must be string")
      .test("id", "It is not valid id.", (val) => isValidObjectId(val)),
  }),
});

export const publishedStorySchema = object({
  params: object({
    storyId: string()
      .label("storyId")
      .required("Story Id is required")
      .typeError("Story Id must be string")
      .test("storyId", "StoryId is not valid id.", (val) =>
        isValidObjectId(val)
      ),
  }),
  body: object({
    isPublished: boolean()
      .nullable()
      .label("isPublished")
      .typeError("Only boolean values are allowed"),
  }),
});

export const updateStorySchema = object({
  params: object({
    storyId: string()
      .label("storyId")
      .required("storyId is required")
      .test("storyId", "It is not valid id.", (val) => isValidObjectId(val)),
  }),
  body: object().shape({
    title: string().label("title").typeError("title must be string"),
    subtitle: string().label("subtitle").typeError("subtitle must be string"),
    body: string().label("body").typeError("body must be string"),
    titleImage: string()
      .label("titleImage")
      .url("titleImage must be url")
      .typeError("titleImage must be url"),
    keywords: string().label("keywords").typeError("keyword must be string"),
    tags: array().label("tags").typeError("tags must be array"),
    additionalTags: array()
      .label("additionalTags")
      .typeError("additionalTags must be array of string"),
    slug: string().label("slug").typeError("Slug must be string type"),
  }),
});

export const likeOrDislikeSchema = object({
  params: object({
    storyId: string()
      .label("storyId")
      .required("Story Id is required")
      .typeError("Story Id must be string")
      .test("storyId", "StoryId is not valid id.", (val) =>
        isValidObjectId(val)
      ),
  }),
});

export const gradeStorySchema = object({
  params: object({
    storyId: string()
      .label("storyId")
      .required("Story Id is required")
      .typeError("Story Id must be string")
      .test("storyId", "StoryId is not valid id.", (val) =>
        isValidObjectId(val)
      ),
  }),
  body: object().shape(
    {
      like: number()
        .label("like")
        .typeError("Express like in number(1,-1)")
        .when("dislike", {
          is: (dislike: any) => typeof dislike === "undefined",
          then: number().required("Like or dislike is required"),
        }),
      dislike: number()
        .label("dislike")
        .typeError("Express dislike in number(1,-1)")
        .when("like", {
          is: (like: any) => typeof like === "undefined",
          then: number().required("Like or dislike is required"),
        }),
    },
    [["like", "dislike"]]
  ),
});

const stringSchema = (label: string, minLength: number, maxLength: number) => {
  let minLengthMsg = `Min length for ${label} is ${minLength} chars`;
  let maxLengthMsg = `Max length ${label} is ${maxLength} chars`;

  return string()
    .trim()
    .min(minLength, minLengthMsg)
    .max(maxLength, maxLengthMsg)
    .required(`${label} is required`)
    .test(label, minLengthMsg, (val) => {
      const res = trimExtra(val, minLength);
      return res;
    })
    .label(label)
    .typeError(`${label} must be string`);
};

export const isAbleToPublished = object({
  title: stringSchema("title", 10, 90),
  titleImage: string()
    .label("titleImage")
    .required("titleImage is required.")
    .url("titleImage must be url")
    .typeError("titleImage must be url"),
  subtitle: stringSchema("subtitle", 10, 175),
  slug: string()
    .required("slug is required to create a story")
    .label("slug")
    .typeError("slug must be string"),
  tags: array()
    .min(1, "Minimum one tag is required.")
    .required("Minimum one tag is required")
    .label("tags")
    .typeError("tags must be array type"),
  content: stringSchema("content", 2200, Infinity),
  keywords: stringSchema("keywords", 10, 150),
});

function notRequiredStringSchema(
  label: string,
  minLength: number,
  maxLength: number
) {
  let msg = `${label} length must be`;
  maxLength !== Infinity
    ? (msg += ` between ${minLength} & ${maxLength} chars`)
    : (msg += ` above ${minLength} chars`);
  return string()
    .nullable()
    .optional()
    .trim()
    .test(label, msg, (val) =>
      !val
        ? true
        : trimExtra(val, minLength) && stringLength(val, minLength, maxLength)
    )
    .label(label)
    .typeError(`${label} must be string`);
}

function stringLength(str: any, min: number, max: number) {
  return !str ? false : str.length < max && str.length > min;
}

export const commentStorySchema = object({
  body: object({
    text: string()
      .typeError("Text is required")
      .label("text")
      .test("text", "Empty is not allowed", (val: any) => trimExtra(val, 1)),
  }),
  params: object({
    storyId: string()
      .label("storyId")
      .required("Story id is required")
      .test("storyId", "story id is invalid.", (val) => isValidObjectId(val)),
  }),
});

export const storyHistoryByIdScheme = object({
  params: object({
    storyId: string()
      .label("storyId")
      .typeError("storyId is required")
      .required("Story id is required")
      .test("storyId", "story id is invalid.", (val) => isValidObjectId(val)),
    historyId: string()
      .label("historyId")
      .typeError("History id is required")
      .required("History id is required")
      .test("historyId", "History id is invalid.", (val) =>
        isValidObjectId(val)
      ),
  }),
});

export const initializeStoryScheme = object({
  body: object({
    slug: string()
      .label("historyId")
      .typeError("storyId is required")
      .required("History id is required"),
  }),
});
