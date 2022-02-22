// @ts-ignore
import axios from '#axios';

export interface LogInFields {
  email: string;
  password: string;
}

export interface UserRegisterFields extends LogInFields {
  username: string;
  passwordConfirmation: string;
}

export const signUp = async (
  values: UserRegisterFields,
  isRegister: boolean
) => {
  try {
    const endPoint = isRegister ? `/auth/register` : `/auth/login`;

    const { data } = await axios.post(endPoint, values);
    return data;
  } catch (err: any) {
    throw err?.response?.data?.message || 'Invalid Data';
  }
};
