import * as yup from "yup";

import YupPassword from "yup-password";

YupPassword(yup); // extend yup

const emailField = (label: string, prettyLabel?: string) =>
  yup
    .string()
    .label(label)
    .email(`${prettyLabel || label} Must be a valid email`)
    .required(`${prettyLabel || label} is required`);

const pwdField = (label: string, prettyLabel?: string) =>
  yup
    .string()
    .password()
    .label(label)
    .minSymbols(1, `${prettyLabel || label} must contain one symbol`)
    .minUppercase(
      1,
      `${prettyLabel || label} must contain one uppercase letter`
    )
    .required(`${prettyLabel || label} is required`);

const pwdConfirmField = (ref: string) =>
  yup.string().oneOf([yup.ref(ref), null], "Passwords must match");

export const authSchema = yup.object({
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
    then: emailField("email", "Email"),
  }),
  confirmPassword: yup.string().when("type", {
    is: (type: string) => type == "register",
    then: pwdConfirmField("confirmPassword"),
  }),

  password: yup.string().when("type", {
    is: (type: string) => ["register", "logIn"].includes(type),
    then: pwdField("pasword", "Password"),
  }),

  identifier: yup
    .string()
    .trim()
    .label("Identifier")
    .when("type", {
      is: (type: string) => {
        return type == "logIn" || type == "forgotPassword";
      },
      then: yup.string().trim().required(),
    }),

  identifierInitials: yup
    .string()
    .trim()
    .label("Identifier Initials")
    .when("type", {
      is: (type: string) => type == "forgotIdentifier",
      then: yup.string().trim().required("Identifier Initials to guess."),
    }),
});

export const changePwdEmailSchemeTemp = yup.object({
  type: yup.string().oneOf(["changePassword", "changeEmail"]),
  newEmail: yup.string().when("type", {
    is: (type: string) => {
      return ["changeEmail"].includes(type);
    },
    then: yup
      .string()
      .label("newEmail")
      .email(`New Email Must be a valid email`)
      .required(`New Email is required`),
  }),
  currentPassword: yup.string().when("type", {
    is: (type: string) => ["changePassword"].includes(type),
    then: yup
      .string()
      .password()
      .label("currentPassword")
      .minSymbols(1, `Current Password must contain one symbol`)
      .minUppercase(1, `Current Password must contain one uppercase letter`)
      .required(`Current Password is required`),
  }),
  newPassword: yup.string().when("type", {
    is: (type: string) => ["changePassword"].includes(type),
    then: yup
      .string()
      .password()
      .label("newPassword")
      .minSymbols(1, `New Password must contain one symbol`)
      .minUppercase(1, `New Password must contain one uppercase letter`)
      .required(`New Password is required`),
  }),
  confirmNewPassword: yup.string().when("type", {
    is: (type: string) => ["changePassword"].includes(type),
    then: pwdConfirmField("newPassword"),
  }),
});

export const changePwdEmailScheme = yup.object({
  type: yup.string().oneOf(["changePassword", "changeEmail"]),
  newEmail: yup.string().when("type", {
    is: (type: string) => {
      return ["changeEmail"].includes(type);
    },
    then: emailField("newEmail", "New Email"),
  }),
  currentPassword: yup.string().when("type", {
    is: (type: string) => ["changePassword"].includes(type),
    then: pwdField("currentPassword", "Current Password"),
  }),
  newPassword: yup.string().when("type", {
    is: (type: string) => ["changePassword"].includes(type),
    then: pwdField("newPassword", "New Password"),
  }),
  confirmNewPassword: yup.string().when("type", {
    is: (type: string) => ["changePassword"].includes(type),
    then: pwdConfirmField("newPassword"),
  }),
});

/**
 * Register => fullName, username, email, pwd, pwdConfirm
 * Login => identifier, pwd
 * Forgot Pwd => email
 * Forgot email => initials
 *
 */
