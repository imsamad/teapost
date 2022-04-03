import CollectionDrawer from "./CollectionDrawer";
import { AiFillFileAdd } from "react-icons/ai";

import TSIconButton from "@compo/UI/TSIconButton";
import TSButton from "@compo/UI/TSButton";
import Router from "next/router";
import { useDisclosure } from "@chakra-ui/react";

const Index = ({ storyId }: { storyId: string }) => {
  const isOnHomePage = ["/", "/home", "/@/[author]", "/tag/[tag]"].includes(
    Router.pathname
  );
  const drawer = useDisclosure();
  return (
    <>
      {!isOnHomePage ? (
        <TSButton
          onClick={() => {
            drawer.onOpen();
          }}
          _active={{
            outline: "none",
          }}
          leftIcon={<AiFillFileAdd fontSize="19px" />}
          size={isOnHomePage ? "xs" : "sm"}
          variant="outline"
          colorScheme="purple"
        >
          Add To Collections
        </TSButton>
      ) : (
        <TSIconButton
          onClick={() => {
            drawer.onOpen();
          }}
          _active={{
            outline: "none",
          }}
          icon={<AiFillFileAdd fontSize="19px" />}
          size={isOnHomePage ? "xs" : "sm"}
          aria-label="add to reading list"
        />
      )}
      <CollectionDrawer
        onClose={drawer.onClose}
        storyId={storyId}
        isOpen={drawer.isOpen}
      />
    </>
  );
};

export default Index;
