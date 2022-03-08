import Cookies from "universal-cookie";
const cookies = new Cookies();

const userAuthCookie = process.env.NEXT_PUBLIC_AUTH_SESSION as string;

const getCookies = () => {
  return cookies.get(userAuthCookie);
};

const setCookies = (user: string) =>
  new Promise((resolve) => {
    cookies.set(userAuthCookie, user);

    resolve(true);
  });

const deleteCookies = () =>
  new Promise((resolve) => {
    cookies.remove(userAuthCookie);
    resolve(true);
  });

export { getCookies, setCookies, deleteCookies };
