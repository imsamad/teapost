import * as yup from "yup";
import { strSchema } from "../utils";

import YupPassword from "yup-password";

YupPassword(yup); // extend yup

const emailField = yup
  .string()
  .email("Must be a valid email")
  .required("Email is required");

const pwdField = yup
  .string()
  .password()
  .minSymbols(1, "Password must contain one symbol")
  .minUppercase(1, "Password must contain one uppercase letter")
  .required("Password is required");

const pwdConfirmField = yup
  .string()
  .oneOf([yup.ref("password"), null], "Passwords must match");

const authSchema = yup.object({
  type: yup
    .string()
    .required("type is required")
    .oneOf(["logIn", "register", "forgotPassword", "forgotIdentifier"]),

  fullName: yup
    .string()
    .trim()
    .label("Full Name")
    .when("type", {
      is: (type: string) => type == "register",
      then: yup.string().trim().required().min(5),
    }),
  username: yup
    .string()
    .trim()
    .label("Unique username")
    .when("type", {
      is: (type: string) => type == "register",
      then: yup.string().trim().required().min(5),
    }),
  email: yup.string().when("type", {
    is: (type: string) => ["register"].includes(type),
    then: emailField,
  }),
  confirmPassword: yup.string().when("type", {
    is: (type: string) => type == "register",
    then: pwdConfirmField,
  }),

  password: yup.string().when("type", {
    is: (type: string) => ["register", "login"].includes(type),
    then: pwdField,
  }),

  identifier: yup
    .string()
    .trim()
    .label("Identifier")
    .when("type", {
      is: (type: string) => {
        return type == "login" || type == "forgotPassword";
      },
      then: yup.string().trim().required(),
    }),

  identifierInitials: yup
    .string()
    .trim()
    .label("identifierInitials")
    .when("type", {
      is: (type: string) => type == "forgotIdentifiers",
      then: yup.string().trim().required(),
    }),
});

export { authSchema };

/**
 * Register => fullName, username, email, pwd, pwdConfirm
 * Login => identifier, pwd
 * Forgot Pwd => email
 * Forgot email => initials
 *
 */
