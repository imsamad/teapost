import { createContext, useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import CollectionDrawer from "../CollectionDrawer";

const UICtx = createContext<{
  drawer: {
    isOpen: boolean;
    onOpen: (story: string) => void;
    onClose: () => void;
  };
}>({
  drawer: { isOpen: false, onOpen: (story: string) => {}, onClose: () => {} },
});

const UICtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [storySelected, setStorySelected] = useState<string>("");
  const drawerStates = useDisclosure();
  const drawer = {
    // @ts-ignore
    onOpen: (story?: string) => {
      setStorySelected(story ?? "");
      drawerStates.onOpen();
    },
    // @ts-ignore
    onClose: () => {
      setStorySelected("");
      drawerStates.onClose();
    },
    isOpen: drawerStates.isOpen,
  };
  return (
    <UICtx.Provider value={{ drawer }}>
      <CollectionDrawer
        isOpen={drawer.isOpen}
        onClose={drawer.onClose}
        storySelected={storySelected}
      />
      {children}
    </UICtx.Provider>
  );
};

const useUICtx = () => useContext(UICtx);

export default useUICtx;
export { UICtxProvider };
