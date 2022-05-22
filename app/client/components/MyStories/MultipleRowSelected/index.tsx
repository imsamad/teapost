import {
  Box,
  Button,
  Collapse,
  Heading,
  HStack,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import DeleteStoryBtn from '@compo/DeleteStoryBtn';
import { deleteManyStoriesApi, publishManyStoriesApi } from '@lib/api/storyApi';
import React, { useEffect } from 'react';
import { TableInstance } from 'react-table';

const MultipleRowSelected = ({
  tableInstance,
  resetStories,
}: {
  tableInstance: any | TableInstance<any>;
  resetStories: () => void;
}) => {
  const storyIds = tableInstance.selectedFlatRows.map(
    (d: any) => d.original._id
  );
  const isPublishing = useDisclosure();
  const isUnPublishing = useDisclosure();

  const handlePublish = (isPublish: boolean) => {
    isPublish ? isPublishing.onOpen() : isUnPublishing.onOpen();

    publishManyStoriesApi({ storyIds, isPublish })
      .then(() => {
        resetStories();
      })
      .catch(() => {})
      .finally(() => {
        isPublish ? isPublishing.onClose() : isUnPublishing.onClose();
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
          <DeleteStoryBtn
            storyIds={storyIds}
            postDeleteCB={() => {
              resetStories();
            }}
          />
          <Button
            isLoading={isPublishing.isOpen}
            colorScheme="green"
            onClick={() => handlePublish(true)}
            loadingText="Publishing..."
          >
            Published {storyIds.length > 1 && 'All'}
          </Button>
          <Button
            isLoading={isUnPublishing.isOpen}
            colorScheme="orange"
            onClick={() => handlePublish(false)}
            variant="outline"
            loadingText="Unpublishing..."
          >
            Un-Published {storyIds.length > 1 && 'All'}
          </Button>
        </HStack>
      </Collapse>
    </Box>
  );
};

export default MultipleRowSelected;
