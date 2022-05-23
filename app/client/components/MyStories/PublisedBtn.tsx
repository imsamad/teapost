import {
  Heading,
  Spinner,
  Switch,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { publishedStoryApi } from '@lib/api/storyApi';
import StoryType from '@lib/types/StoryType';
import React, { useEffect, useState } from 'react';
import { CellProps } from 'react-table';

const PublishedBtn = (props: CellProps<StoryType>) => {
  const storyId = props.cell.row.original._id;
  const [isPublished, setIsPublished] = useState(props.value);
  const isLoading = useDisclosure();
  const toast = useToast();
  const handlePublished = async () => {
    isLoading.onOpen();
    publishedStoryApi({ storyId, isPublished: !isPublished })
      .then((data) => {
        setIsPublished(data.story.isPublished);
      })
      .catch(() => {
        toast({
          status: 'error',
          title: `Can't published as it have incomplete fields`,
          isClosable: true,
          duration: 400,
        });
      })
      .finally(() => {
        isLoading.onClose();
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (props.value != isPublished) setIsPublished(props.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);
  return (
    <VStack>
      <Switch
        size="lg"
        colorScheme="teal"
        value={isPublished}
        isChecked={isPublished}
        onChange={handlePublished}
      />
      <Heading size="sm">Published</Heading>
      {isLoading.isOpen && <Spinner color="red.500" />}
    </VStack>
  );
};

export default PublishedBtn;
