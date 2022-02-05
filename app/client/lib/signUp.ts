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
  setMessages: Function
) => {
  try {
    const { data } = await axios.post(`${apiUrl}/auth/register`, values);
    setMessages({ error: false, url: data.url, message: data.message });
  } catch (err: any) {
    const msgs = err.response.data.message;

    setMessages({
      error: true,
      message: msgs ? msgs : 'Invalid data, please try again.',
    });
  }
};
