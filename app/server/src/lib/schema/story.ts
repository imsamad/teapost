import { boolean, number, object, string, array } from "yup";
import { strArrSchema, strSchema } from "../utils";

import { isValidObjectId } from "mongoose";
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
    body: object()
      .shape(
        {
          collabWth: array()
            .of(
              string().test(
                "collabWith",
                "Collab With must be valid id array",
                (val: any) =>
                  !val ? true : val?.every((id: any) => isValidObjectId(id))
              )
            )
            .label("collabWith")
            .when("uncollabWith", {
              is: (uncollabWith: any) => {
                return !uncollabWith;
              },
              then: array()
                .required("Collab with is required")
                .min(1)
                .test("collabWith", "Must be unique", (val: any) => {
                  return new Set(val)?.size == val?.length;
                }),
            }),
          uncollabWith: array()
            .of(
              string().test(
                "uncollabWith",
                "Collab With must be valid id array",
                (val: any) =>
                  !val ? true : val?.every((id: any) => isValidObjectId(id))
              )
            )
            .when("collabWith", {
              is: (collabWith: any) => {
                return !collabWith;
              },
              then: array()
                .required("Collab with is required")
                .min(1)
                .test(
                  "uncollabWith",
                  "Must be unique",
                  (val: any) => new Set(val)?.size == val?.length
                ),
            }),
        },
        [["collabWith", "uncollabWith"]]
      )
      .label("body")
      .test("body", "Provde valid ids.", (body) => {
        //
        let collabWith: any = body?.collabWith || null,
          uncollabWith: any = body?.uncollabWith || null,
          correct = true;

        // if (!collabWith && !uncollabWith) return false;

        if (correct && uncollabWith && collabWith) {
          if (
            new Set([...collabWith, ...uncollabWith])?.size !=
            collabWith?.length + uncollabWith?.length
          )
            correct = false;
        }

        return correct;
      }),
  });
};

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
