import { boolean, number, object, string } from "yup";
import { strArrSchema, strSchema } from "../utils";

const singleParam = (label: string, isMongoId: boolean) => ({
  params: object({
    [label]: strSchema(label, { isRequired: true, isMongoId }),
  }),
});
export const singleParamsObj = (label: string, isMongoId = true) => {
  return object({
    ...singleParam(label, isMongoId),
  });
};

export const getStoryByTagSchema = singleParamsObj("tagName", false);

export const getStoryByAuthorSchema = singleParamsObj("authorUsername", false);

export const changeSlugSchema = object({
  body: object({
    slug: strSchema("slug", { isRequired: true }),
    id: strSchema("id", { isRequired: true, isMongoId: true }),
  }),
});

export const publishedStorySchema = object({
  ...singleParam("storyId", true),

  body: object({
    isPublished: boolean()
      .nullable()
      .label("isPublished")
      .typeError("Only boolean values are allowed"),
  }),
});

export const collabUncollabSchema = (isCollab: boolean) => {
  const key = isCollab ? "collabWith" : "uncollabWith";
  return object({
    ...singleParam("storyId", true),
    body: object({
      [key]: strArrSchema(key, { isMongoId: true, isRequired: true, min: 1 }),
    }),
  });
};
export const updateStorySchema = object({
  ...singleParam("storyId", true),

  body: object().shape({
    title: strSchema("title", {}),
    subtitle: strSchema("subtitle", {}),
    titleImage: string()
      .label("titleImage")
      .url("titleImage must be url")
      .typeError("titleImage must be url"),
    keywords: strSchema("keywords", {}),
    tags: strArrSchema("tags", { isMongoId: true, isRequired: false }),
    additionalTags: strArrSchema("additionalTags", { strMin: 3 }),
    slug: strSchema("slug", {}),
  }),
});

export const gradeStorySchema = object({
  ...singleParam("storyId", true),
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

export const isAbleToPublished = object({
  title: strSchema("title", { min: 10, isRequired: true }),

  titleImage: string()
    .label("titleImage")
    .required("titleImage is required.")
    .url("titleImage must be url")
    .typeError("titleImage must be url"),

  subtitle: strSchema("subtitle", { min: 20, isRequired: true }),
  slug: strSchema("slug", { isRequired: true }),
  tags: strArrSchema("tags", { isMongoId: true, isRequired: false, min: 1 }),
  content: strSchema("content", { min: 2200, isRequired: true }),
  keywords: strSchema("keywords", { min: 10, isRequired: true }),
});

export const storyHistoryByIdScheme = object({
  params: object({
    storyId: strSchema("storyId", { isRequired: true, isMongoId: true }),
    historyId: strSchema("historyId", { isRequired: true, isMongoId: true }),
  }),
});

export const initializeStoryScheme = object({
  body: object({
    title: strSchema("title", {}),
    subtitle: strSchema("subtitle", {}),
    keywords: strSchema("keywords", {}),
    tags: strArrSchema("tags", { isMongoId: true, isRequired: false }),
    additionalTags: strArrSchema("additionalTags", { strMin: 3 }),
    slug: strSchema("slug", {}),
    body: string().label("body").typeError("body must be string"),
    titleImage: string()
      .label("titleImage")
      .url("titleImage must be url")
      .typeError("titleImage must be url"),
  }),
});
