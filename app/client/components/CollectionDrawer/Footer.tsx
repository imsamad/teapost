import { Button, DrawerFooter } from "@chakra-ui/react";
import React from "react";
import { useUICtx } from "../Context";

const Footer = ({
  handleSubmit,
  isOpen,
}: {
  handleSubmit: () => void;
  isOpen: boolean;
}) => {
  const { drawer } = useUICtx();
  return (
    <DrawerFooter borderTopWidth="1px">
      <Button variant="outline" mr={3} onClick={drawer.onClose} size="sm">
        Cancel
      </Button>
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

export default Footer;
