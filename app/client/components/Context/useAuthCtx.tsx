import { createContext, useContext, useEffect, useState } from "react";
import { deleteCookies, getCookies, setCookies } from "../../lib/cookies";

type UserType = {
  id?: string;
  email?: string;
  username?: string;
  role?: string;
};

const AuthCtx = createContext<{
  user: Partial<UserType>;
  setUser: (props: Partial<UserType>) => void;
}>({ user: getCookies(), setUser: () => {} });

const AuthCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserDis] = useState<any>(getCookies());

  const setUser = (val: UserType) => {
    if (!Object.keys(val).length) setUserDis(null);
    else setUserDis((pre: UserType) => ({ ...pre, ...val }));
  };

  useEffect(() => {
    if (!user) deleteCookies();
    else setCookies(user);
  }, [user]);
  return (
    <AuthCtx.Provider value={{ user, setUser }}>{children}</AuthCtx.Provider>
  );
};

const useAuthCtx = () => useContext(AuthCtx);

export default useAuthCtx;
export { AuthCtxProvider };
