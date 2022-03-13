import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

import { deleteCookies, getCookies, setCookies } from "@lib/cookies";
import LoginModal from "../LogIn/LogInModal";
import userType from "@lib/types/userType";

type AuthCtxType = {
  user: Partial<userType>;
  setUser: (props: Partial<userType>) => void;
  login: { isOpen: boolean; onOpen: () => void; onClose: () => void };
};

const AuthCtx = createContext<AuthCtxType>({
  user: getCookies(),
  setUser: () => {},
  login: { isOpen: false, onOpen: () => {}, onClose: () => {} },
});

const AuthCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserDis] = useState<any>(getCookies());

  const setUser = (val: Partial<userType>) => {
    if (!Object.keys(val).length) setUserDis(null);
    else {
      setCookies(val).finally(() => {
        setUserDis((pre: userType) => ({ ...pre, ...val }));
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

  useEffect(() => {
    if (!user) deleteCookies();
    else setCookies(user);
  }, [user]);
  return (
    <AuthCtx.Provider value={{ user, setUser, login }}>
      <LoginModal isOpen={isOpen} onClose={onClose} />
      {children}
    </AuthCtx.Provider>
  );
};

const useAuthCtx = () => useContext(AuthCtx);

export default useAuthCtx;
export { AuthCtxProvider };
