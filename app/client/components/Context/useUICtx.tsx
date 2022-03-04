import { createContext, useContext } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import LogInModal from '../LogIn/LogInModal';

const UICtx = createContext<any>(undefined);

const UICtxProvider = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const login = {
    isOpen,
    on: onOpen,
    off: onClose,
    onOpen,
    onClose,
  };
  return (
    <UICtx.Provider value={{ login }}>
      <LogInModal isOpen={isOpen} onClose={onClose} />
      {children}
    </UICtx.Provider>
  );
};

const useUICtx = () => useContext(UICtx);

export default useUICtx;
export { UICtxProvider };
