import * as yup from "yup";
import { isValidObjectId } from "mongoose";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

import { trimExtra, typeOf } from "../utils";

const usernameField = yup
  .string()
  .typeError("username must be string")
  .label("username")
  .required("Username is required")
  .test("username", "Username must be above 4 chars.", (val) =>
    trimExtra(val, 4)
  );
const fullNameField = yup
  .string()
  .typeError("Full Name must be string")
  .label("fullName")
  .required("Full Name is required")
  .test("fullName", "Full Name must be above 4 chars.", (val) =>
    trimExtra(val, 4)
  );

const emailField = yup
  .string()
  .email("Must be a valid email")
  .required("Email is required")
  .label("email");

const pwdField = yup
  .string()
  .password()
  .minSymbols(1, "Password must contain one symbol")
  .minUppercase(1, "Password must contain one uppercase letter")
  .required("password is required")
  .label("password");

const pwdConfirmField = yup
  .string()
  .oneOf([yup.ref("password"), null], "Passwords must match")
  .label("passwordConfirmation")
  .typeError("passwordConfirmation must be string");

export const registerSchema = yup.object({
  body: yup.object({
    username: usernameField,
    fullName: fullNameField,
    email: emailField,
    password: pwdField,
    passwordConfirmation: pwdConfirmField,
  }),
});

export const logInSchema = yup.object({
  body: yup.object({
    email: emailField,
    password: yup.string().required("Password is required").label("password"),
  }),
});

export const verifyEmailSchema = yup.object({
  query: yup.object({
    token: yup.string().required("Mallicious request.").label("data"),
  }),
});

export const followSchema = yup.object({
  params: yup.object({
    authorId: yup
      .string()
      .label("authorId")
      .required("Author is required")
      .typeError("Author Id must be string")
      .test("authorId", "Author is not valid.", (val) => isValidObjectId(val)),
  }),
});

export const addToCollectionSchema = yup.object({
  params: yup.object({
    storyId: yup
      .string()
      .required("Story Id is required")
      .label("storyId")
      .typeError("StoryId must valid string")
      .test("storyId", "Story is not valid", (val) => isValidObjectId(val)),
  }),
  body: yup
    .object()
    .shape({
      addTo: yup
        .array()
        .label("addTo")
        .typeError("Provide list of collection")
        .test("addTo", "Provide valid collections", (val: any) => {
          return !val
            ? true
            : typeOf(val, "array")
            ? new Set(val).size === val.length &&
              val.every((v: string) => isValidObjectId(v))
            : false;
        }),
      removeFrom: yup
        .array()
        .label("removeFrom")
        .typeError("Provide list of collection toremove from")
        .test("removeFrom", "Provide valid collections", (val: any) => {
          return !val
            ? true
            : typeOf(val, "array")
            ? new Set(val).size === val.length &&
              val.every((v: any) => isValidObjectId(v))
            : false;
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
      "body ",
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
