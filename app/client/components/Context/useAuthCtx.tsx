import { useDisclosure, useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";

import { deleteCookies, getCookies, setCookies } from "@lib/cookies";
import LoginModal from "../LogIn/LogInModal";
import userType from "@lib/types/UserType";
import CustomToast from "@compo/StoryCard/customToast";

type AuthCtxType = {
  user: Partial<userType>;
  setUser: (props: Partial<userType>) => void;
  login: { isOpen: boolean; onOpen: () => void; onClose: () => void };
  openLoginToast: () => void;
};

const AuthCtx = createContext<AuthCtxType>({
  user: getCookies(),
  setUser: () => {},
  openLoginToast: () => {},
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
  const toast = useToast();

  const openLoginToast = () =>
    toast({
      duration: 2000,
      isClosable: true,
      render: CustomToast(onOpen),
    });

  useEffect(() => {
    if (!user) deleteCookies();
    else setCookies(user);
  }, [user]);
  return (
    <AuthCtx.Provider value={{ user, setUser, login, openLoginToast }}>
      <LoginModal isOpen={isOpen} onClose={onClose} />
      {children}
    </AuthCtx.Provider>
  );
};

const useAuthCtx = () => useContext(AuthCtx);

export default useAuthCtx;
export { AuthCtxProvider };
