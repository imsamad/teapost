import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import Router from 'next/router';

const useUser = ({ redirectTo = '', redirectToIfLoggedIn = false } = {}) => {
  const cookies = new Cookies();

  const userAuthCookie = process.env.NEXT_PUBLIC_AUTH_SESSION as string;
  const refreshTokenCookie = process.env
    .NEXT_PUBLIC_REFRESH_AUTH_SESSION as string;

  const user = cookies.get(userAuthCookie);
  const refreshToken = cookies.get(refreshTokenCookie);

  const setCookies = (userValue: any, refToken: any, redirect?: string) => {
    cookies.set(userAuthCookie, userValue);
    cookies.set(refreshTokenCookie, refToken);
    if (redirect || redirectTo) Router.push(redirect || redirectTo);
  };

  useEffect(() => {
    if (!redirectTo || !user) return;

    if (
      (redirectTo && !redirectToIfLoggedIn && !user) ||
      (redirectToIfLoggedIn && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectTo, redirectToIfLoggedIn]);
  return { user, setCookies, refreshToken };
};

export default useUser;
