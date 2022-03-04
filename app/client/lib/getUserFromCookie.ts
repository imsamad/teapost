import Cookies from 'universal-cookie';
const cookies = new Cookies();

// const getCookies = () =>
//   new Promise((resolve) =>
//     resolve({
//       user: user ?? false,
//       refreshToken: refreshToken ?? false,
//     })
//   );

const userAuthCookie = process.env.NEXT_PUBLIC_AUTH_SESSION as string;
const refreshTokenCookie = process.env
  .NEXT_PUBLIC_REFRESH_AUTH_SESSION as string;

const getCookies = () => {
  const user = cookies.get(userAuthCookie);
  const refreshToken = cookies.get(refreshTokenCookie);

  return {
    user: user ?? false,
    refreshToken: refreshToken ?? false,
  };
};

const setCookies = (user: string, refreshToken: string) =>
  new Promise((resolve) => {
    cookies.set(userAuthCookie, user);
    cookies.set(refreshTokenCookie, refreshToken);
    resolve(true);
  });

const deleteCookies = () =>
  new Promise((resolve) => {
    cookies.remove(userAuthCookie);
    cookies.remove(refreshTokenCookie);
    resolve(true);
  });

export { getCookies, setCookies, deleteCookies };
