import React, { createContext, useContext, useState } from "react";
import { getCookies } from "../../lib/getUserFromCookie";

const AuthCtx = createContext<
  Partial<{
    user: any;
    refreshToken: string;
    setUser?: any;
  }>
>(getCookies());

const AuthCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ user, refreshToken }, setUser] = useState<any>(getCookies());
  return (
    <AuthCtx.Provider value={{ user, refreshToken, setUser }}>
      {children}
    </AuthCtx.Provider>
  );
};

const useAuthCtx = () => useContext(AuthCtx);

export default useAuthCtx;
export { AuthCtxProvider };
