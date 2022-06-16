import { UpDownIcon } from '@chakra-ui/icons';
import { Box, Button, Collapse, useDisclosure } from '@chakra-ui/react';

import { CgArrowsScrollV } from 'react-icons/cg';

import ShowStoriesList from './ShowStoriesList';
const fo = {
  _focus: { outline: 'none' },
  variant: 'outline',
  colorScheme: 'blue',

  size: 'sm',
};
const ShowStories = ({ collectionId }: { collectionId: string }) => {
  const showStories = useDisclosure();

  return (
    <Box>
      <Button
        {...fo}
        rightIcon={
          !showStories.isOpen ? <UpDownIcon /> : <CgArrowsScrollV size="25px" />
        }
        onClick={showStories.onToggle}
        loadingText="loading.."
      >
        Stories
      </Button>

      <Collapse in={showStories.isOpen} animateOpacity>
        <Box maxH="90vh" overflowY="auto" pr={2}>
          {showStories.isOpen && (
            <ShowStoriesList collectionId={collectionId} pageNo={1} />
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default ShowStories;
