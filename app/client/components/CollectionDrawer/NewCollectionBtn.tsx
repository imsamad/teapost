import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Collapse,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";

import NewCollection from "../NewCollection";

const Index = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <HStack my="2">
        <Spacer />
        <Button
          leftIcon={isOpen ? <CloseIcon /> : <AddIcon />}
          size="xs"
          onClick={onToggle}
          colorScheme="teal"
        >
          {isOpen ? "Close" : "New"}
        </Button>
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <NewCollection onCancel={() => onClose()} />
      </Collapse>
    </>
  );
};

export default Index;
