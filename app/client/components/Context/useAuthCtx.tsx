import { useDisclosure, useToast } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";

import { deleteCookies, getCookies, setCookies } from "@lib/cookies";
import LoginModal from "../LogIn/LogInModal";
import { AuthUser } from "@lib/types/UserType";
import CustomToast from "@compo/UI/customToast";

type AuthCtxType = {
  user: Partial<AuthUser>;
  setUser: (props: Partial<AuthUser>) => void;
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

  const setUser = (val: Partial<AuthUser>) => {
    if (!Object.keys(val).length) deleteCookies().then(() => setUserDis(null));
    else {
      /*
       * Have to set cookies asyncronously , to make sure they have been set bcoz ,
       * in useProfile() immediatley related profile would be fetched
       */
      setCookies(val).finally(() => {
        setUserDis((pre: AuthUser) => ({ ...pre, ...val }));
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

  // useEffect(() => {
  //   if (!user) deleteCookies();
  //   else setCookies(user);
  // }, [user]);

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
