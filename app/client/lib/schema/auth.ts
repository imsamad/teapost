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
  isRegister: yup
    .boolean()
    .required("Specify is register or login required")
    .typeError("Non-boolean not allowed"),
  isForgetPassword: yup
    .boolean()
    .required("Specify is isForgetPassword")
    .typeError("Non-boolean not allowed"),

  isForgetEmail: yup
    .boolean()
    .required("Specify is isForgetPassword")
    .typeError("Non-boolean not allowed"),

  username: yup
    .string()
    .trim()
    .when("isRegister", {
      is: (isRegister: boolean) => isRegister,
      then: strSchema("username", { isRequired: true, min: 4 }),
    }),
  fullName: yup
    .string()
    .trim()
    .when("isRegister", {
      is: (isRegister: boolean) => isRegister,
      then: strSchema("username", { isRequired: true, min: 5 }),
    }),
  email: emailField,
  password: pwdField,
  passwordConfirmation: yup.string().when("isRegister", {
    is: (isRegister: boolean) => isRegister,
    then: pwdConfirmField,
  }),
});

export { authSchema };
