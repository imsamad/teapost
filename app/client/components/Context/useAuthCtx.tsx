import { useDisclosure, useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { deleteCookies, getCookies, setCookies } from "@lib/cookies";
import LoginModal from "../LogIn/LogInModal";
import { AuthTypeResponse } from "@lib/types/UserType";
import CustomToast from "@compo/UI/customToast";

type AuthCtxType = {
  auth: Partial<AuthTypeResponse>;
  setAuth: (props: Partial<AuthTypeResponse>, redirectTo?: string) => void;
  login: { isOpen: boolean; onOpen: () => void; onClose: () => void };
  logout: (redirect?: string) => void;
  openLoginToast: () => void;
};

const AuthCtx = createContext<AuthCtxType>({
  auth: getCookies(),
  setAuth: () => {},
  logout: (redirect?: string) => {},
  openLoginToast: () => {},
  login: { isOpen: false, onOpen: () => {}, onClose: () => {} },
});

const AuthCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  /**
   * Auth states ,set & delete <==> Login ,logout
   ***********************************************/
  const [auth, setAuthState] = useState<Partial<AuthTypeResponse>>(
    getCookies()
  );
  const setAuth = (val: Partial<AuthTypeResponse>, redirectTo?: string) => {
    if (!Object.keys(val).length) {
      deleteCookies().then(() => setAuthState({}));
    } else {
      setCookies(val).finally(() => {
        setAuthState((pre) => ({ ...pre, ...val }));
        if (router.pathname.startsWith("/auth") && !redirectTo)
          redirectTo = "/me";

        if (redirectTo) router.push(redirectTo);
      });
    }
  };
  const logout = (redirect?: string) => {
    deleteCookies().finally(() => {
      setAuthState({});
      if (redirect && router.pathname.startsWith("/me")) router.push("/auth");
    });
  };
  /**
   * Login Modal
   *****************************/
  const { isOpen, onOpen, onClose } = useDisclosure();
  const login = {
    isOpen,
    on: () => {
      if (!router.pathname.startsWith("/auth")) onOpen();
    },
    off: onClose,
    onOpen: () => {
      if (!router.pathname.startsWith("/auth")) onOpen();
    },
    onClose,
  };
  /**
   * Custom Login Toast
   ************************/
  const toast = useToast();
  const openLoginToast = () =>
    toast({
      duration: 2000,
      isClosable: true,
      render: CustomToast(onOpen),
    });

  useEffect(() => {
    //   if (!user) deleteCookies();
    //   else setCookies(user);
    if (router.pathname.startsWith("/me") && !auth?.user?._id)
      router.replace(`/auth?=${router.asPath}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthCtx.Provider value={{ auth, setAuth, login, openLoginToast, logout }}>
      <LoginModal isOpen={isOpen} onClose={onClose} />
      {children}
    </AuthCtx.Provider>
  );
};

const useAuthCtx = () => useContext(AuthCtx);

export default useAuthCtx;
export { AuthCtxProvider };
