import { object, string } from "yup";
import { strSchema } from "../utils";

export const replyToSchema = object({
  body: object({
    text: strSchema("text", { isRequired: true, min: 1 }),
  }),
  params: object({
    commentId: strSchema("commentId", { isMongoId: true, isRequired: true }),
  }),
});

export const reqStoryParams = object({
  params: object({
    storyId: strSchema("storyId", { isMongoId: true, isRequired: true }),
  }),
});

export const reqCommentParams = object({
  params: object({
    commentId: strSchema("commentId", { isMongoId: true, isRequired: true }),
  }),
});
export const reqPrimaryIdSchema = object({
  params: object({
    primaryId: strSchema("primaryId", { isMongoId: true, isRequired: true }),
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
