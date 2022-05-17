import { UpDownIcon } from '@chakra-ui/icons';
import { Box, Button, Collapse, useDisclosure } from '@chakra-ui/react';
import { CgArrowsScrollV } from 'react-icons/cg';

import Stories from '@compo/Stories';
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
        onClick={() => showStories.onToggle()}
        // isLoading={isValidating}
        loadingText="loading.."
      >
        Stories
      </Button>

      <Collapse in={showStories.isOpen} animateOpacity>
        <Box maxH="90vh" overflowY="auto" pr={2}>
          {showStories.isOpen && (
            <Stories
              collectionId={collectionId}
              // isInitial={true}
              nextPageNo={1}
              query={`/collections/stories/${collectionId}?`}
            />
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default ShowStories;
