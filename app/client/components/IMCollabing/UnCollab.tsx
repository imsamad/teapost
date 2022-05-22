import {
  Box,
  Heading,
  Spinner,
  Switch,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { unCollabMeApi } from '@lib/api/storyApi';
import StoryType from '@lib/types/StoryType';
import { useStories } from './index';
import { CellProps } from 'react-table';

const UnCollab = (props: CellProps<StoryType>) => {
  const storyId = props.value;
  const { resetStories } = useStories();
  const isLoading = useDisclosure();
  const toast = useToast();
  const handlePublished = async () => {
    isLoading.onOpen();
    console.log('storyId from columns ', storyId);
    unCollabMeApi(storyId)
      .then((data) => {
        resetStories();
      })
      .catch(() => {
        toast({
          status: 'error',
          title: `Server is under-maintenance please try again`,
          isClosable: true,
          duration: 400,
        });
      })
      .finally(() => {
        isLoading.onClose();
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
      <Switch
        size="lg"
        colorScheme="teal"
        value={1}
        isChecked={true}
        onChange={handlePublished}
      />
      <Heading size="sm">UnCollab</Heading>
      {isLoading.isOpen && <Spinner color="red.500" />}
    </>
  );
};

export default UnCollab;
