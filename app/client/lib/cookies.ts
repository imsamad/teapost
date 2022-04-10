import Cookies from "universal-cookie";

import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { AuthTypeResponse } from "./types/UserType";

const cookies = new Cookies();
const userAuthCookie = process.env.NEXT_PUBLIC_AUTH_SESSION!;

const getCookies = () => {
  return cookies.get<AuthTypeResponse>(userAuthCookie);
};

const oneDay = 24 * 60 * 60;

const setCookies = (user: any) =>
  new Promise((resolve) => {
    cookies.set(userAuthCookie, user, {
      path: "/",
      maxAge: oneDay,
      sameSite: "strict",
      encode: (val: any) => {
        return val;
      },
    });

    resolve(true);
  });

const deleteCookies = () =>
  new Promise((resolve) => {
    cookies.remove(userAuthCookie);
    resolve(true);
  });

const getCookieFromServer = (cookies: NextApiRequestCookies): Promise<string> =>
  new Promise((resolve, reject) => {
    const userAuthCookie: string = process.env.AUTH_SESSION!;
    let token: any = cookies?.[userAuthCookie];

    if (!token) resolve("");
    token = JSON.parse(token).accessToken;
    if (!token) resolve("");
    resolve(token);
  });
export { getCookies, setCookies, deleteCookies, getCookieFromServer };
