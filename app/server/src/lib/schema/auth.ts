import * as yup from "yup";
import { isValidObjectId } from "mongoose";
import YupPassword from "yup-password";
YupPassword(yup); // extend yup

import { strSchema, trimExtra, typeOf } from "../utils";

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
    username: strSchema("username", { isRequired: true, min: 4 }),
    fullName: strSchema("fullName", {
      isRequired: true,
      min: 4,
      prettyLabel: "Full Name",
    }),
    email: emailField,
    password: pwdField,
    passwordConfirmation: pwdConfirmField,
  }),
});

export const logInSchema = yup.object({
  body: yup.object({
    identifier: strSchema("identifier", {
      isRequired: true,
      prettyLabel: "Username or email is required.",
    }),
    password: strSchema("password", {
      isRequired: true,
      prettyLabel: "Password",
    }),
  }),
});

export const verifyEmailSchema = yup.object({
  query: yup.object({
    token: strSchema("token", { isRequired: true }),
  }),
});

export const followSchema = yup.object({
  params: yup.object({
    authorId: strSchema("authorId", {
      isRequired: true,
      isMongoId: true,
      prettyLabel: "Author Id",
    }),
  }),
});
