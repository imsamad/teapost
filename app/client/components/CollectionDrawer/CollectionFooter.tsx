import { Button, DrawerFooter } from "@chakra-ui/react";
import React from "react";

const CollectionFooter = ({
  handleSubmit,
  isOpen,
}: {
  handleSubmit: () => void;
  isOpen: boolean;
}) => {
  return (
    <DrawerFooter borderTopWidth="1px">
      <Button
        colorScheme="blue"
        size="sm"
        onClick={handleSubmit}
        loadingText="Saving..."
        isLoading={isOpen}
      >
        Save
      </Button>
    </DrawerFooter>
  );
};

export default CollectionFooter;
