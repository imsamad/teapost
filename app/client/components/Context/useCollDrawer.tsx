import { createContext, useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import CollectionDrawer from "../CollectionDrawer";

const CollDrawerCtx = createContext<{
  drawer: {
    isOpen: boolean;
    onOpen: (story: string) => void;
    onClose: () => void;
  };
}>({
  drawer: { isOpen: false, onOpen: (story: string) => {}, onClose: () => {} },
});

const CollDrawerCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [storySelected, setStorySelected] = useState<string>("");
  const { onClose, isOpen, onOpen } = useDisclosure();
  const drawer = {
    // @ts-ignore
    onOpen: (story: string) => {
      setStorySelected(story);
      onOpen();
    },
    onClose: () => {
      setStorySelected("");
      onClose();
    },
    isOpen,
  };

  return (
    <CollDrawerCtx.Provider value={{ drawer }}>
      {isOpen && (
        <CollectionDrawer
          isOpen={isOpen}
          onClose={onClose}
          storySelected={storySelected}
        />
      )}
      {children}
    </CollDrawerCtx.Provider>
  );
};

const useCollDrawer = () => useContext(CollDrawerCtx);

export default useCollDrawer;
export { CollDrawerCtxProvider };
