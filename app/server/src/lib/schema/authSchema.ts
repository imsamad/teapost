import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup); // extend yup

import { typeOf } from '../utils';

const emailField = yup
  .string()
  .email('Must be a valid email')
  .required('Email is required')
  .label('email');

const pwdField = yup
  .string()
  .password()
  .minSymbols(1, 'Password must contain one symbol')
  .minUppercase(1, 'Password must contain one uppercase letter')
  .required('password is required')
  .label('password');

const pwdConfirmField = yup
  .string()
  .oneOf([yup.ref('password'), null], 'Passwords must match')
  .label('passwordConfirmation')
  .typeError('passwordConfirmation must be string');

export const registerSchema = yup.object({
  body: yup.object({
    username: yup
      .string()
      .label('username')
      .typeError('username must be string type.')
      .required()
      .min(4),
    fullName: yup
      .string()
      .label('fullName')
      .typeError('fullName must be string type.')
      .required()
      .min(4),
    email: emailField,
    password: pwdField,
    passwordConfirmation: pwdConfirmField,
  }),
});

export const logInSchema = yup.object({
  body: yup.object({
    identifier: yup
      .string()
      .label('identifier')
      .typeError('identifier must be string type.')
      .required(),
    password: yup
      .string()
      .label('password')
      .typeError('password must be string type.')
      .required(),
  }),
});

export const verifyEmailSchema = yup.object({
  query: yup.object({
    token: yup
      .string()
      .label('token')
      .typeError('password must be string type.')
      .required(),
  }),
});

export const followSchema = yup.object({
  params: yup.object({
    authorId: yup
      .string()
      .label('authorId')
      .typeError('StoryId must be valid.')
      .required()
      .test('storyId', 'StoryId must be valid.', (val: any) =>
        typeOf(val, 'mongoId')
      ),
  }),
});
