import { useDisclosure, useToast } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import Router from "next/router";

import { deleteCookies, getCookies, setCookies } from "@lib/cookies";
import LoginModal from "../LogIn/LogInModal";
import { AuthUser } from "@lib/types/UserType";
import CustomToast from "@compo/UI/customToast";

type AuthCtxType = {
  user: Partial<AuthUser>;
  setUser: (props: Partial<AuthUser>) => void;
  login: { isOpen: boolean; onOpen: () => void; onClose: () => void };
  logout: (redirect?: string) => void;
  openLoginToast: () => void;
};

const AuthCtx = createContext<AuthCtxType>({
  user: getCookies(),
  setUser: () => {},
  logout: (redirect?: string) => {},
  openLoginToast: () => {},
  login: { isOpen: false, onOpen: () => {}, onClose: () => {} },
});

const AuthCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<any>(getCookies());

  const setUser = (val: Partial<AuthUser>) => {
    if (!Object.keys(val).length)
      deleteCookies().then(() => setUserState(null));
    else {
      /*
       * Have to set cookies asyncronously , to make sure they have been set bcoz ,
       * in useProfile() immediatley related profile would be fetched
       */
      setCookies(val).finally(() => {
        setUserState((pre: AuthUser) => ({ ...pre, ...val }));
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const login = {
    isOpen,
    on: onOpen,
    off: onClose,
    onOpen,
    onClose,
  };
  const toast = useToast();

  const openLoginToast = () =>
    toast({
      duration: 2000,
      isClosable: true,
      render: CustomToast(onOpen),
    });
  const logout = (redirect?: string) => {
    deleteCookies().finally(() => {
      setUserState(null);
      if (redirect) Router.push("/auth");
    });
  };
  // useEffect(() => {
  //   if (!user) deleteCookies();
  //   else setCookies(user);
  // }, [user]);

  return (
    <AuthCtx.Provider value={{ user, setUser, login, openLoginToast, logout }}>
      <LoginModal isOpen={isOpen} onClose={onClose} />
      {children}
    </AuthCtx.Provider>
  );
};

const useAuthCtx = () => useContext(AuthCtx);

export default useAuthCtx;
export { AuthCtxProvider };
