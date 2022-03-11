import * as yup from "yup";
import { trimExtra, typeOf } from "../lib/utils";
import { isValidObjectId } from "mongoose";
export const createCollectionSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .label("title")
      .required("Title is required")
      .typeError("Title must be string.")
      .test("title", "Title must be above 1 chars.", (val) =>
        trimExtra(val, 1)
      ),
    description: yup
      .string()
      .label("description")
      .typeError("Description must be string.")
      .test("description", "Description must be above 1 chars.", (val) =>
        typeof val === "undefined" ? true : trimExtra(val, 1)
      ),
    isPublic: yup
      .boolean()
      .label("isPublic")
      .typeError("isPublic must be a boolean value"),
    stories: yup
      .array()
      .label("stories")
      .typeError("Stories must be array")
      .test("stories", "Stories must be valid", (val: any) =>
        !val ? true : val.every((v: any) => isValidObjectId(v))
      ),
  }),
});

export const updateCollectionSchema = yup.object({
  body: yup
    .object({
      title: yup
        .string()
        .label("title")
        .typeError("Title must be string.")
        .test("title", "Title must be above 1 chars.", (val) =>
          !val ? true : trimExtra(val, 1)
        ),
      description: yup
        .string()
        .label("description")
        .typeError("Description must be string.")
        .test("description", "Description must be above 1 chars.", (val) =>
          typeof val === "undefined" ? true : trimExtra(val, 1)
        ),
      isPublic: yup
        .boolean()
        .label("isPublic")
        .typeError("isPublic must be a boolean value"),
      stories: yup
        .array()
        .label("stories")
        .typeError("Stories must be array")
        .test("stories", "Stories must be valid", (val: any) =>
          !val ? true : val.every((v: any) => isValidObjectId(v))
        ),
    })
    .label("body")
    .test("body", "Provide respective data", (val: any) => {
      console.log("val ", val);
      return val?.title ||
        val?.description ||
        typeOf(val?.stories, "array") ||
        typeof val?.isPublic !== "undefined"
        ? true
        : false;
    }),
});

export const removeCollectionSchema = yup.object({
  params: yup.object({
    collectionId: yup
      .string()
      .label("collectionId")
      .required("Collection Id is required")
      .typeError("collection must be valid id")
      .test("collectionId", "Provide valid collection id", (val: any) =>
        isValidObjectId(val)
      ),
  }),
});
