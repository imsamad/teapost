import {
  Box,
  Button,
  Collapse,
  Heading,
  HStack,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { unCollabMeMultipleApi } from '@lib/api/storyApi';

import { TableInstance } from 'react-table';

const RenderMultipleSelect = ({
  tableInstance,
  resetStories,
}: {
  tableInstance: any | TableInstance<any>;
  resetStories: () => void;
}) => {
  const storyIds = tableInstance.selectedFlatRows.map(
    (d: any) => d.original._id
  );

  const isUnCollabing = useDisclosure();

  const handleClick = () => {
    // tableInstance.stateReducer((state,actions))
    var res = confirm('Do you want to uncollab from the stories?');
    if (!res) return;
    isUnCollabing.onOpen();
    unCollabMeMultipleApi(storyIds)
      .then(() => {
        resetStories();
      })
      .catch(() => {})
      .finally(() => {
        isUnCollabing.onClose();
      });
  };

  return (
    <Box my={2}>
      <Collapse in={storyIds.length}>
        <HStack
          wrap="wrap"
          border="1px"
          borderColor="gray.300"
          p={2}
          borderRadius="md"
        >
          <Heading size="md">{storyIds.length} selected</Heading>
          <Spacer />
          <Button
            colorScheme="red"
            onClick={handleClick}
            isLoading={isUnCollabing.isOpen}
            loadingText="UnCollabing..."
          >
            UnCollab {storyIds.length > 1 && 'All'}
          </Button>
        </HStack>
      </Collapse>
    </Box>
  );
};

export default RenderMultipleSelect;
