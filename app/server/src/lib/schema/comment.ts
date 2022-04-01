import { object, string } from "yup";
import { strSchema } from "../utils";

export const replySchema = (label: string) =>
  object({
    body: object({
      text: strSchema("text", { isRequired: true, min: 1 }),
    }),
    params: object({
      [label]: strSchema(label, { isMongoId: true, isRequired: true }),
    }),
  });

export const reqSingleParams = (label: string) =>
  object({
    params: object({
      [label]: strSchema(label, { isMongoId: true, isRequired: true }),
    }),
  });

export const likeOrDislikeSchema = object({
  params: object({
    commentId: strSchema("commentId", { isMongoId: true, isRequired: true }),
    type: string()
      .label("type")
      .required("Type is required")
      .typeError("It must be string ")
      .oneOf(["primary", "secondary"]),
  }),
});
