import { useDisclosure, useToast } from '@chakra-ui/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { deleteCookies, getCookies, setCookies } from '@lib/cookies';
import LoginModal from '../LogIn/LogInModal';
import { LogInResponseType } from '@lib/types/UserType';
import CustomToast from '@compo/UI/customToast';

type AuthCtxType = {
  auth: Partial<LogInResponseType> | null;
  setAuth: (props: Partial<LogInResponseType>, redirectTo?: string) => void;

  openLoginToast: () => void;
  /***** LogIn Modal Handlers *******/
  loginModal: { isOpen: boolean; onOpen: () => void; onClose: () => void };
  logout: (redirect?: string) => void;
};

const AuthCtx = createContext<AuthCtxType>({
  auth: getCookies(),
  setAuth: () => {},
  logout: (redirect?: string) => {},
  openLoginToast: () => {},
  loginModal: { isOpen: false, onOpen: () => {}, onClose: () => {} },
});

const AuthCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isOnLogInPage = router.pathname.startsWith('/auth');

  /**
   * Auth states ,set & delete <==> Login ,logout
   ***********************************************/
  const [auth, setAuthState] = useState<Partial<LogInResponseType>>(
    getCookies()
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const openLoginModal = () => !isOnLogInPage && onOpen();

  const setAuth = async (
    val: Partial<LogInResponseType> = {},
    redirectTo?: string
  ) => {
    if (!Object.keys(val).length) {
      await deleteCookies();
      setAuthState({});
    } else {
      setCookies(val).finally(() => {
        setAuthState((pre) => ({ ...pre, ...val }));
        /**** If Logged In & not defined to redirect Move to /me page ****/

        if (isOpen) {
          redirectTo = '';
          onClose();
        } else if (isOnLogInPage && !redirectTo) redirectTo = '/me';

        if (redirectTo) router.push(redirectTo);
      });
    }
  };

  const logout = (redirect?: string) => {
    deleteCookies().finally(() => {
      setAuthState({});
      if (redirect && router.pathname.startsWith('/me'))
        router.push(`/auth?redirectTo=me`);
    });
  };
  /**
   * Login Modal
   *****************************/

  const loginModal = {
    isOpen,
    on: openLoginModal,
    onOpen: openLoginModal,
    off: onClose,
    onClose: onClose,
  };
  /********************************
   ******* Custom Login Toast *****
   *******************************/
  const toast = useToast();
  const openLoginToast = () =>
    toast({
      duration: 2000,
      isClosable: true,
      render: CustomToast(onOpen),
      id: 'login-modal-toast',
    });

  useEffect(() => {
    if (router.pathname.startsWith('/me') && !auth?.user?._id)
      router.replace(`/auth?=${router.asPath}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthCtx.Provider
      value={{ auth, setAuth, loginModal, openLoginToast, logout }}
    >
      <LoginModal isOpen={isOpen} onClose={onClose} />
      {children}
    </AuthCtx.Provider>
  );
};

const useAuthCtx = () => useContext(AuthCtx);

export default useAuthCtx;
export { AuthCtxProvider };
