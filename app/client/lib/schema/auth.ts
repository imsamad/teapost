import * as yup from 'yup';
import { trimExtra } from '../utils';

import YupPassword from 'yup-password';

YupPassword(yup); // extend yup

const usernameField = yup
  .string()
  .trim()
  .required('Username is required')
  .test('username', 'Username must be above 4 chars', (val) =>
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
  password: yup.string().required('Password is required'),
});

const logInSchema = yup.object({
  isRegister: yup
    .boolean()
    .required('Specify is register or login required')
    .typeError('Non-boolean not allowed'),
  username: yup
    .string()
    .trim()
    .when('isRegister', {
      is: (isRegister: boolean) => isRegister,
      then: yup
        .string()
        .required('Username is required')
        .test('Username', 'Username must be above 4 chars', (val) =>
          trimExtra(val, 4)
        ),
    }),
  email: emailField,
  password: pwdField,
  passwordConfirmation: yup.string().when('isRegister', {
    is: (isRegister: boolean) => isRegister,
    then: pwdConfirmField,
  }),
});

export { registerSchema, signInSchema, logInSchema };
