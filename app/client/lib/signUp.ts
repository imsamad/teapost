import axios from './axios';

export interface LogInFields {
  isRegister: boolean;
  email: string;
  password: string;
}

export interface UserRegisterFields extends LogInFields {
  username: string;
  passwordConfirmation: string;
}

export const signUp = async (values: UserRegisterFields) => {
  try {
    const apiUrl = values.isRegister ? `/auth/register` : `/auth/login`;

    const { data } = await axios.post(apiUrl, values);

    return data;
  } catch (err: any) {
    throw err?.response?.data || 'Invalid Data';
  }
};
