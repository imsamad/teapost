import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Heading, HStack, Switch, VStack } from '@chakra-ui/react';

const StoryAuthorActions = (props: {
  postDeleteCB?: () => {};
  postPublishedCB?: () => {};
  preDeleteCB?: () => {};
  prePublishedCB?: () => {};
  storyIds: string | string[];
  wasPublished?: boolean;
}) => {
  const ext =
    typeof props.storyIds != 'string' && props.storyIds.length > 1 && `  All`;

  /* */
  return (
    <HStack>
      <Button colorScheme="red" size="sm" leftIcon={<DeleteIcon />}>
        Delete {ext}
      </Button>
      {typeof props.storyIds == 'string' ? (
        <VStack>
          <Heading size="sm">Published</Heading>
          <Switch
            colorScheme="cyan"
            size="lg"
            isChecked={props.wasPublished}
            value={props.wasPublished ? 1 : 0}
            onChange={() => {}}
          />
        </VStack>
      ) : (
        <Button size="sm" colorScheme="green">
          Published {ext}
        </Button>
      )}
    </HStack>
  );
};

export default StoryAuthorActions;
