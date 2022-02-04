import * as yup from 'yup';
import { trimExtra } from '../utils';

import YupPassword from 'yup-password';

YupPassword(yup); // extend yup

const usernameField = yup
  .string()
  .trim()
  .required('Username is required')
  .test('password', 'Username must be above 4 chars.', (val) =>
    trimExtra(val, 4)
  );

const emailField = yup
  .string()
  .email('Must be a valid email')
  .required('Email is required');

const pwdField = yup
  .string()
  .password()
  .minSymbols(1, 'Password must contain one symbol')
  .minUppercase(1, 'Password must contain one uppercase letter')
  .required('Password is required');

const pwdConfirmField = yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match');

const registerSchema = yup.object({
  username: usernameField,
  email: emailField,
  password: pwdField,
  passwordConfirmation: pwdConfirmField,
});
const signInSchema = yup.object({
  email: emailField,
  password: pwdField,
});

export { registerSchema, signInSchema };
