import UserType from "@lib/types/UserType";
import axios from "../axios";

export const formFields = {
  register: ["fullName", "username", "email", "password", "confirmPassword"],
  logIn: ["identifier", "password"],
  forgotPassword: ["identifier"],
  forgotIdentifier: ["identifierInitials"],
};

export type AuthType = {
  type: "logIn" | "register" | "forgotPassword" | "forgotIdentifier";
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  identifier: string;
  identifierInitials: string;
};

export type AuthResponse = {
  matchedIdentifiers: string[];
  message: string | string[];
  redirectUrl: string;
  user: UserType;
  accessToken: string;
  status: "ok" | "error";
};

export const submitAuth = async (values: Partial<AuthType>) => {
  try {
    let endpoint = `/auth/${values.type?.toLowerCase()}`;

    const { data } = await axios.post<Partial<AuthResponse>>(endpoint, values);

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
