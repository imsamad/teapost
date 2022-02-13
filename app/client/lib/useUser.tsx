import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import Router from 'next/router';

const useUser = ({ redirectTo = '', redirectToIfLoggedIn = false } = {}) => {
  // console.log('useUser ');
  const cookies = new Cookies();

  const userAuthCookie = process.env.NEXT_PUBLIC_AUTH_SESSION as string;
  const refreshTokenCookie = process.env
    .NEXT_PUBLIC_REFRESH_AUTH_SESSION as string;

  const user = cookies.get(userAuthCookie);
  const refreshToken = cookies.get(refreshTokenCookie);

  const setCookies = (
    userValue: any,
    refToken: any,
    customRedirect?: string
  ) => {
    cookies.set(userAuthCookie, userValue);
    cookies.set(refreshTokenCookie, refToken);
    if (customRedirect || redirectTo) Router.push(customRedirect || redirectTo);
  };

  const logout = (customRedirect?: string) => {
    cookies.remove(userAuthCookie);
    cookies.remove(refreshTokenCookie);
    if (customRedirect || redirectTo) Router.push(customRedirect || redirectTo);
  };

  useEffect(() => {
    if (!redirectTo) return;

    if (
      (redirectTo && !redirectToIfLoggedIn && !user) ||
      (redirectToIfLoggedIn && user)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectTo, redirectToIfLoggedIn]);
  return { user, setCookies, refreshToken, logout };
};

export default useUser;
