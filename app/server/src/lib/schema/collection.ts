import * as yup from "yup";
import { strSchema, strArrSchema } from "../utils";

export const createCollectionSchema = yup.object({
  body: yup.object({
    title: strSchema("title", { isRequired: true }),
    description: strSchema("description", {}),
    stories: strArrSchema("stories", { isMongoId: true, isRequired: true }),
  }),
});

export const updateCollectionSchema = yup.object({
  body: yup.object({
    title: strSchema("title", {}),
    description: strSchema("description", {}),
    stories: strArrSchema("stories", { isMongoId: true, isRequired: true }),
  }),
});

export const removeCollectionSchema = yup.object({
  params: yup.object({
    collectionId: strSchema("collectionId", {
      isMongoId: true,
      isRequired: true,
      prettyLabel: "Collection Id",
    }),
  }),
});
