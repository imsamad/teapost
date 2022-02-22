import { useEffect } from 'react';
import Router from 'next/router';

import {
  getCookies,
  setCookies as setCookiesCustom,
  deleteCookies,
} from './getUserFromCookie';

const useUser = ({ redirectTo = '', redirectToIfLoggedIn = false } = {}) => {
  const { user, refreshToken } = getCookies();

  const setCookies = (
    userValue: any,
    refToken: any,
    customRedirect?: string
  ) => {
    setCookiesCustom(userValue, refToken).finally(() => {
      if (customRedirect || redirectTo)
        Router.push(customRedirect || redirectTo);
    });
  };

  const logout = (customRedirect?: string) => {
    deleteCookies().finally(() => {
      if (customRedirect || redirectTo)
        Router.push(customRedirect || redirectTo);
    });
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
