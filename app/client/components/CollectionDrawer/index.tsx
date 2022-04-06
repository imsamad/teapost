import CollectionDrawer from "./CollectionDrawer";

import { IconButton, useDisclosure } from "@chakra-ui/react";
import { BiBookAdd } from "react-icons/bi";

const Index = ({ storyId }: { storyId: string }) => {
  const drawer = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="add-to-collection"
        icon={<BiBookAdd />}
        size="sm"
        variant="outline"
        colorScheme="blue"
        outline="none"
        border="0"
        _focus={{
          outline: "none",
          border: "none",
        }}
        onClick={drawer.onOpen}
      />
      {drawer.isOpen && (
        <CollectionDrawer
          onClose={drawer.onClose}
          storyId={storyId}
          isOpen={drawer.isOpen}
        />
      )}
    </>
  );
};

export default Index;
