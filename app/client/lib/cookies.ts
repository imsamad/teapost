import Cookies from "universal-cookie";
const cookies = new Cookies();

const userAuthCookie = process.env.NEXT_PUBLIC_AUTH_SESSION!;

const getCookies = () => {
  return cookies.get(userAuthCookie);
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

export { getCookies, setCookies, deleteCookies };
