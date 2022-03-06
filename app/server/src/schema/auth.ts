import * as yup from "yup";

import YupPassword from "yup-password";
YupPassword(yup); // extend yup

import { trimExtra } from "../lib/utils";

const usernameField = yup
  .string()
  .typeError("username must be string")
  .label("username")
  .required("Username is required")
  .test("username", "Username must be above 4 chars.", (val) =>
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
