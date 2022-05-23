import {
  Box,
  Heading,
  Spinner,
  Switch,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useResetData } from '@compo/ReactTableCtxProvider';
import { unCollabMeApi } from '@lib/api/storyApi';
import StoryType from '@lib/types/StoryType';
import { CellProps } from 'react-table';

const UnCollab = (props: CellProps<StoryType>) => {
  const storyId = props.value;
  const { resetData } = useResetData();
  const isLoading = useDisclosure();
  const toast = useToast();
  const handlePublished = async () => {
    isLoading.onOpen();
    console.log('storyId from columns ', storyId);
    unCollabMeApi(storyId)
      .then((data) => {
        resetData();
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
    <VStack>
      <Switch
        size="lg"
        colorScheme="teal"
        value={1}
        isChecked={true}
        onChange={handlePublished}
      />
      <Heading size="sm">Un Collab</Heading>
      {isLoading.isOpen && <Spinner color="red.500" />}
    </VStack>
  );
};

export default UnCollab;
