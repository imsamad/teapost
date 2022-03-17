import { object, string } from "yup";
import { trimExtra } from "../utils";
import { isValidObjectId } from "mongoose";

const reqParams = (label: string) =>
  object({
    [label]: string()
      .label(label)
      .required(`${label} is required`)
      .test(label, `${label} is invalid.`, (val) => isValidObjectId(val)),
  });

export const replyToSchema = object({
  body: object({
    text: string()
      .typeError("Text is required")
      .label("text")
      .test("text", "Empty is not allowed", (val: string) => trimExtra(val, 1)),
  }),
  params: reqParams("commentId"),
});

export const reqStoryParams = object({
  params: reqParams("storyId"),
});
export const reqCommentParams = object({
  params: reqParams("commentId"),
});

export const likeOrDislikeSchema = object({
  params: object({
    commentId: string()
      .label("commentId")
      .required(`commentId is required`)
      .test("commentId", `commentId is invalid.`, (val) =>
        isValidObjectId(val)
      ),
    type: string()
      .label("type")
      .required("Type is required")
      .typeError("It must be string ")
      .oneOf(["primary", "secondary"]),
  }),
});
