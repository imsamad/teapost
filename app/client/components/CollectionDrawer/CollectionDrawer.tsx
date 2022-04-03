import {
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import CollectionContent from "./CollectionContent";

const Index = ({
  storyId,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  storyId: string;
}) => {
  return (
    <Drawer size="xs" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          My Story collections
        </DrawerHeader>
        <CollectionContent storyId={storyId} />
      </DrawerContent>
    </Drawer>
  );
};

export default Index;
