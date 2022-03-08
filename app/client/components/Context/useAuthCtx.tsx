import React, { createContext, useContext, useEffect, useState } from "react";
import {
  deleteCookies,
  getCookies,
  setCookies,
} from "../../lib/getUserFromCookie";
import { USE_INFORM_COOKIE_CHANGE } from "../SWR";

const AuthCtx = createContext<
  Partial<{
    user: any;
    refreshToken: string;
    setUser?: any;
  }>
>(getCookies());

const AuthCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ user, refreshToken }, setUser] = useState<any>(getCookies());
  const { INFORM_COOKIE_CHANGE } = USE_INFORM_COOKIE_CHANGE();
  useEffect(() => {
    if (user || refreshToken) {
      setCookies(user, refreshToken).finally(() => INFORM_COOKIE_CHANGE());
    } else deleteCookies().finally(() => INFORM_COOKIE_CHANGE());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refreshToken]);
  return (
    <AuthCtx.Provider value={{ user, refreshToken, setUser }}>
      {children}
    </AuthCtx.Provider>
  );
};

const useAuthCtx = () => useContext(AuthCtx);

export default useAuthCtx;
export { AuthCtxProvider };
