import * as yup from 'yup';

import YupPassword from 'yup-password';
YupPassword(yup); // extend yup

import trimExtra from '../utils/trimExtra';

export const registerSchema = yup.object({
  body: yup.object({
    username: yup
      .string()
      .trim()
      .required('Username is required')
      .test('password', 'Username must be above 4 chars.', (val) =>
        trimExtra(val, 4)
      )
      .min(4, 'Username must be above 4 chars.'),
    email: yup
      .string()
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .password()
      .minSymbols(1, 'Password must contain one symbol')
      .minUppercase(1, 'Password must contain one uppercase letter')
      .required('Password is required'),
    // password: string()
    //   .required('Password is required')
    //   .min(6, 'Password is too short - should be 6 chars minimum.')
    //   .matches(/^[a-zA-Z0-9_.-]*$/, 'Password can only contain Latin letters.'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  }),
});
export const verifyEmailSchema = yup.object({
  query: yup.object({
    token: yup.string().required('Mallicious request.'),
  }),
});
