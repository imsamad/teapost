import axios from 'axios';

export interface LogInFields {
  email: string;
  password: string;
}

export interface UserRegisterFields extends LogInFields {
  username: string;
  passwordConfirmation: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;

export const signUp = async (
  values: UserRegisterFields,
  isRegister: boolean
) => {
  try {
    const endPoint = isRegister
      ? `${apiUrl}/auth/register`
      : `${apiUrl}/auth/login`;

    const { data } = await axios.post(endPoint, values);
    return data;
    // setMessages({ error: false, url: data.url, message: data.message });
  } catch (err: any) {
    throw err?.response?.data?.message || 'Invalid Data';
  }
};
