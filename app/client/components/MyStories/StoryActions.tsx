import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  Heading,
  HStack,
  Link,
  Spinner,
  Switch,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { publishedStoryApi } from '@lib/api/storyApi';
import StoryType from '@lib/types/StoryType';
import { useState } from 'react';
import { CellProps } from 'react-table';

const StoryActions = (props: CellProps<StoryType>) => {
  const slug = props.cell.row.original.slug;
  const storyId = props.cell.row.original._id;
  const isLoading = useDisclosure();
  const toast = useToast();
  const [isPublished, setIsPublished] = useState(props.value);
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

  return (
    <VStack my={2}>
      {props.value ? (
        <Link href={`/story/${slug}`} isExternal>
          <Button
            size="sm"
            rightIcon={<ExternalLinkIcon mx="2px" />}
            colorScheme="blue"
          >
            Visit
          </Button>
        </Link>
      ) : null}
      <Link href={`/me/stories/edit/${storyId}`} isExternal>
        <Button size="sm" rightIcon={<EditIcon mx="2px" />} colorScheme="green">
          Edit
        </Button>
      </Link>
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
      {/*  <Button colorScheme="red" size="sm">
        Delete
      </Button> */}
    </VStack>
  );
};

export default StoryActions;
