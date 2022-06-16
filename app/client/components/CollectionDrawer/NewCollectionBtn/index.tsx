import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  HStack,
  Collapse,
  useDisclosure,
  Spacer,
} from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';

import NewCollection from '@compo/NewCollection';

const NewCollectionBtn = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <HStack my="2">
        <Spacer />
        <TSButton
          leftIcon={isOpen ? <CloseIcon /> : <AddIcon />}
          size="xs"
          onClick={onToggle}
          colorScheme="teal"
        >
          {isOpen ? 'Close' : 'New'}
        </TSButton>
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <NewCollection onCancel={() => onClose()} />
      </Collapse>
    </>
  );
};

export default NewCollectionBtn;
