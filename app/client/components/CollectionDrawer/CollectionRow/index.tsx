import { DeleteIcon } from '@chakra-ui/icons';

import {
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';

import { useState } from 'react';

import { StoryCollectionType } from '@lib/types/StoryCollectionType';
import { buildCollectionApi, deleteCollection } from '@lib/api/collectionApi';
import CollectionText from './CollectionText';

type CollRowProps = {
  collection: StoryCollectionType;
  storyId?: string;
};

const CollectionRow = ({
  storyId,
  collection: collectionProp,
}: CollRowProps) => {
  const [collection, setColletion] = useState(collectionProp);
  const isBuliding = useDisclosure();
  const isDeleting = useDisclosure();
  const handleDelete = () => {
    isDeleting.onOpen();
    deleteCollection(collection._id)
      .then(() => {
        // @ts-ignore
        setColletion(null);
      })
      .finally(() => {
        isDeleting.onClose();
      });
  };

  const addRemoveStory = async (isAdd: boolean) => {
    console.log('isAdd ', isAdd);
    if (!storyId) return;
    isBuliding.onOpen();
    let reqBody: any = { storyId };
    isAdd
      ? (reqBody.addTo = [collection._id])
      : (reqBody.removeFrom = [collection._id]);

    try {
      await buildCollectionApi(reqBody);

      setColletion(({ stories, ...rest }) => ({
        ...rest,
        stories: isAdd
          ? [...stories, storyId]
          : stories.filter((story) => story != storyId),
      }));
    } catch {
    } finally {
      isBuliding.onClose();
    }
  };
  return (
    <>
      {collection && (
        <>
          <HStack overflow="hidden" my={2}>
            <Box m={1}>
              {storyId &&
                (isBuliding.isOpen ? (
                  <Spinner size="sm" alignSelf="flex-start" />
                ) : (
                  <Checkbox
                    alignSelf="flex-start"
                    isChecked={collection.stories.includes(storyId)}
                    onChange={(e) => addRemoveStory(e.target.checked)}
                    icon={<CustomIcon />}
                    colorScheme="cyan"
                    size="lg"
                  />
                ))}
            </Box>
            <CollectionText collection={collection} />
            <IconButton
              alignSelf="flex-start"
              isRound
              icon={<DeleteIcon />}
              aria-label="delete"
              size="xs"
              colorScheme="red"
              isLoading={isDeleting.isOpen}
              onClick={handleDelete}
            />
          </HStack>
        </>
      )}
    </>
  );
};
function CustomIcon(props: any) {
  const { isIndeterminate, isChecked, ...rest } = props;

  const d = isIndeterminate
    ? 'M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,19a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,12,19Zm1.6-6.08a1,1,0,0,0-.6.917,1,1,0,1,1-2,0,3,3,0,0,1,1.8-2.75A2,2,0,1,0,10,9.255a1,1,0,1,1-2,0,4,4,0,1,1,5.6,3.666Z'
    : 'M0,12a1.5,1.5,0,0,0,1.5,1.5h8.75a.25.25,0,0,1,.25.25V22.5a1.5,1.5,0,0,0,3,0V13.75a.25.25,0,0,1,.25-.25H22.5a1.5,1.5,0,0,0,0-3H13.75a.25.25,0,0,1-.25-.25V1.5a1.5,1.5,0,0,0-3,0v8.75a.25.25,0,0,1-.25.25H1.5A1.5,1.5,0,0,0,0,12Z';

  return (
    <Icon viewBox="0 0 24 24" {...rest}>
      <path fill="currentColor" d={d} />
    </Icon>
  );
}
export default CollectionRow;
