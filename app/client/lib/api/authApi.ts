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

export interface UpdatDetailsType {
  profilePic: string;

  newPassword: string;
  currentPassword: string;

  username: string;
  fullName: string;
  tagLines: string[];
}

export const updateProfile = async ({
  type,
  reqBody: { profilePic, ...rest },
}: {
  type: "profilePic" | "other" | "password";
  reqBody: Partial<UpdatDetailsType>;
}) => {
  try {
    let reqBody: Partial<UpdatDetailsType> = {};
    if (type == "profilePic") {
      reqBody.profilePic = profilePic;
    } else {
      reqBody = rest;
    }
    const { data } = await axios.put<AuthResponse>("/auth/update", reqBody);

    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const changeEmail = async (newEmail: string) => {
  try {
    const { data } = await axios.put<{ message: string; redirectUrl: string }>(
      "/auth/changeemail",
      {
        newEmail,
      }
    );

    return data;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const updateDetailFields = {
  changePassword: ["currentPassword", "newPassword", "confirmNewPassword"],
  changeEmail: ["newEmail"],
};
