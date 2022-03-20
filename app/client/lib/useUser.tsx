import { useEffect } from "react";
import Router from "next/router";

import { useAuthCtx } from "../components/Context";

const useUser = ({ redirectTo = "", redirectToIfLoggedIn = false } = {}) => {
  const { user, setUser } = useAuthCtx();

  const setCookies = (user: any, customRedirect?: string) => {
    setUser(user);

    if (customRedirect || redirectTo) {
      const to = customRedirect || redirectTo;
      Router.push(to);
    }
  };

  const logout = (customRedirect?: string) => {
    setUser({});
    if (customRedirect || redirectTo) Router.push(customRedirect || redirectTo);
  };

  useEffect(() => {
    if (!redirectTo) {
      return;
    }
    const haveToRediectButUserNotLoggedIn =
        redirectTo && !redirectToIfLoggedIn && !user,
      redirectToIfUserLoggedIn = redirectToIfLoggedIn && user;

    if (haveToRediectButUserNotLoggedIn || redirectToIfUserLoggedIn) {
      Router.push(redirectTo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, redirectTo, redirectToIfLoggedIn]);
  return { user, setCookies, logout };
};

export default useUser;
