import { useEffect } from 'react';
import Router from 'next/router';

import { useAuthCtx } from '../components/Context';

const useUser = ({ redirectTo = '', redirectToIfLoggedIn = false } = {}) => {
  const { auth, setAuth, logout: logOutUser } = useAuthCtx();

  const setCookies = (user: any, customRedirect?: string) => {
    setAuth(user);

    if (customRedirect || redirectTo) {
      const to = customRedirect || redirectTo;
      Router.push(to);
    }
  };

  const logout = (customRedirect?: string) => {
    logOutUser();
    if (customRedirect || redirectTo) Router.push(customRedirect || redirectTo);
  };

  useEffect(() => {
    if (!redirectTo) {
      return;
    }
    const haveToRediectButUserNotLoggedIn =
        redirectTo && !redirectToIfLoggedIn && !auth,
      redirectToIfUserLoggedIn = redirectToIfLoggedIn && auth;

    if (haveToRediectButUserNotLoggedIn || redirectToIfUserLoggedIn) {
      Router.push(redirectTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, redirectTo, redirectToIfLoggedIn]);
  return { auth, setCookies, logout };
};

export default useUser;
