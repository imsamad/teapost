import {
  Button,
  Heading,
  HStack,
  Spinner,
  Switch,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useResetData } from '@compo/ReactTableCtxProvider';
import { publishUnPublishStoriesAdminApi } from '@lib/api/adminApi';
import { useEffect, useState } from 'react';

const PublishStories = ({
  storyIds,
  showCheckBox,
  isPublishedByAdmin: isPublishedByAdminProp,
}: {
  storyIds: string[];
  showCheckBox?: boolean;
  isPublishedByAdmin?: boolean;
}) => {
  const { resetData } = useResetData();

  const isLoading = useDisclosure();
  const toast = useToast();
  const [isPublishedByAdmin, setIsPublishedByAdmin] = useState(
    isPublishedByAdminProp
  );

  useEffect(() => {
    isPublishedByAdminProp != isPublishedByAdmin &&
      setIsPublishedByAdmin(isPublishedByAdminProp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublishedByAdminProp]);

  const handleClick = async (isPublish: boolean) => {
    try {
      await publishUnPublishStoriesAdminApi({ storyIds, isPublish });
      if (showCheckBox) setIsPublishedByAdmin(!isPublishedByAdmin);
      else await resetData();
    } catch {
      toast({
        status: 'error',
        title: `Can't carry out operation server is busy, please try again`,
        isClosable: true,
        duration: 400,
      });
    }
  };

  return (
    <HStack>
      {showCheckBox ? (
        <VStack>
          <Switch
            size="lg"
            colorScheme="teal"
            isChecked={isPublishedByAdmin}
            onChange={() => handleClick(!isPublishedByAdmin)}
          />
          <Heading size="sm">
            {isPublishedByAdmin ? 'UnPublish' : 'Publish'}
          </Heading>
          {isLoading.isOpen && <Spinner color="red.500" />}
        </VStack>
      ) : (
        <>
          <Button colorScheme="orange" onClick={() => handleClick(false)}>
            UnPublish
          </Button>
          <Button colorScheme="green" onClick={() => handleClick(true)}>
            Publish
          </Button>
        </>
      )}
    </HStack>
  );
};

export default PublishStories;
