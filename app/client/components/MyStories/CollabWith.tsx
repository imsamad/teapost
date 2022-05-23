import { Button, useDisclosure, VStack } from '@chakra-ui/react';
import CollabingWith from '@compo/CollabingWith';
import UsersListModal from '@compo/UsersListModal';
import { collabWithApi } from '@lib/api/storyApi';
import StoryType from '@lib/types/StoryType';
import React, { useState } from 'react';
import { FcCollaboration } from 'react-icons/fc';
import { CellProps } from 'react-table';

const CollabWith = (props: CellProps<StoryType>) => {
  const [alreadyCollabWith, setAlreadyCollabWith] = useState(props.value);

  const storyId = props.cell.row.original._id;

  const modal = useDisclosure();
  const onClickCB = async (userId: string, isChecked: boolean) => {
    const body: { addAuthors?: string[]; removeAuthors?: string[] } = {};
    if (isChecked) body.addAuthors = [userId];
    else body.removeAuthors = [userId];
    try {
      const data = await collabWithApi(storyId, body);
      data?.story.collabWith && setAlreadyCollabWith(data?.story.collabWith);
      return data?.story.collabWith.includes(userId) ? true : false;
    } catch (err) {
      return false;
    }
  };
  return (
    <VStack>
      {alreadyCollabWith.length ? (
        <CollabingWith users={alreadyCollabWith} />
      ) : null}
      <Button
        mr="8px"
        _focus={{
          outline: 'none',
        }}
        colorScheme="green"
        variant="outline"
        leftIcon={<FcCollaboration />}
        onClick={modal.onOpen}
      >
        Add Collab +
      </Button>
      <UsersListModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        checkedUsers={alreadyCollabWith}
        onClickCB={onClickCB}
      />
    </VStack>
  );
};

export default CollabWith;
