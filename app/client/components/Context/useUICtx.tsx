import { createContext, useContext, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

import CollectionDrawer from "../CollectionDrawer";
import CommentDrawer from "../CommentDrawer";
const UICtx = createContext<{
  drawer: {
    isOpen: boolean;
    onOpen: (storyId: string) => void;
    onClose: () => void;
  };
  comment: {
    isOpen: boolean;
    onOpen: (storyId: string) => void;
    onClose: () => void;
  };
}>({
  drawer: { isOpen: false, onOpen: (storyId: string) => {}, onClose: () => {} },
  comment: {
    isOpen: false,
    onOpen: (storyId: string) => {},
    onClose: () => {},
  },
});

const UICtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [storySelected, setStorySelected] = useState<string>("");

  const drawerStates = useDisclosure();
  const drawer = {
    onOpen: (storyId?: string) => {
      setStorySelected(storyId ?? "");
      drawerStates.onOpen();
    },
    onClose: () => {
      setStorySelected("");
      drawerStates.onClose();
    },
    isOpen: drawerStates.isOpen,
  };

  const commentDrawerState = useDisclosure();
  const comment = {
    isOpen: commentDrawerState.isOpen,
    onOpen: (storyId: string) => {
      setStorySelected(storyId ?? "");
      commentDrawerState.onOpen();
    },
    onClose: () => {
      setStorySelected("");
      commentDrawerState.onClose();
    },
  };

  return (
    <UICtx.Provider value={{ drawer, comment }}>
      <CollectionDrawer
        isOpen={drawer.isOpen}
        onClose={drawer.onClose}
        storySelected={storySelected}
      />
      <CommentDrawer
        isOpen={commentDrawerState.isOpen}
        onClose={comment.onClose}
        storySelected={storySelected}
      />
      {children}
    </UICtx.Provider>
  );
};

const useUICtx = () => useContext(UICtx);

export default useUICtx;
export { UICtxProvider };
