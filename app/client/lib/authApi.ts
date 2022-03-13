import axios from "./axios";

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
    throw err?.response?.data || "Invalid Data";
  }
};

export const followAuthor = async (
  authorId: string,
  hasBeenFollowing: boolean
) => {
  try {
    const { data } = await axios.put(
      `/auth/${hasBeenFollowing ? "unfollow" : "follow"}/${authorId}`
    );
    return data;
  } catch (err: any) {
    throw err?.response?.data || "Invalid Data";
  }
};

export const addToCollection = async (
  reqObj: {
    addTo: string[];
    removeFrom: string[];
  },
  storyId: string
) => {
  try {
    const { data } = await axios.put(`/auth/collection/add/${storyId}`, reqObj);
    return data;
  } catch (err: any) {
    throw err?.response?.data || "Invalid Data";
  }
};
