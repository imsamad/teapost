import * as yup from "yup";
import { strSchema, strArrSchema, typeOf } from "../utils";

export const createCollectionSchema = yup.object({
  body: yup.object({
    title: strSchema("title", { isRequired: true }),
    description: strSchema("description", {}),
    stories: strArrSchema("stories", { isMongoId: true, isRequired: false }),
  }),
});

export const updateCollectionSchema = yup.object({
  body: yup.object({
    title: strSchema("title", {}),
    description: strSchema("description", {}),
    stories: strArrSchema("stories", { isMongoId: true, isRequired: false }),
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

export const buildSchema = yup.object({
  body: yup
    .object()
    .shape({
      storyId: strSchema("storyId", {
        isRequired: true,
        isMongoId: true,
        prettyLabel: "Story Id",
      }),
      addTo: strArrSchema("addTo", {
        isMongoId: true,
      }),
      removeFrom: strArrSchema("removeFrom", {
        isMongoId: true,
      }),
      addToDefault: yup
        .boolean()
        .label("addToDefault")
        .typeError("Express addToDefault in boolean"),
      removeFromDefault: yup
        .boolean()
        .label("removeFromDefault")
        .typeError("Express removeFromDefault in boolean"),
    })
    .label("body")
    .test(
      "body",
      "Provide valid & unique collections list to add & remove",
      (val: any) => {
        /**
         * a.) If boths important fields are not present
         * b.) If present then it must array
         * c.) If both present then both must be unique
         * a.) If any field is present it must array, length > 0 with distinct ids
         * b.) String in both array must be distinct
         */

        if (
          typeof val?.addTo === "undefined" &&
          typeof val?.removeFrom === "undefined" &&
          typeof val?.addToDefault === "undefined" &&
          typeof val?.removeFromDefault === "undefined"
        )
          return false;

        let isAddArray = typeOf(val?.addTo, "array"),
          isRemoveArray = typeOf(val?.removeFrom, "array");

        // if (typeof val?.addTo !== "undefined" && !isAddArray) {
        //   return false;
        // }

        // if (typeof val?.removeFrom !== "undefined" && !isRemoveArray) {
        //   return false;
        // }

        if (isAddArray && isRemoveArray)
          return (
            new Set([...val.addTo, ...val.removeFrom]).size ===
            val.removeFrom?.length + val.addTo?.length
          );
        return true;
      }
    ),
});
