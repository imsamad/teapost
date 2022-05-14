import { DeleteIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import TSIconButton from '@compo/UI/TSIconButton';
import { buildCollectionApi, deleteCollection } from '@lib/api/collectionApi';
import React from 'react';

const RemoveBtn = ({
  collectionId,
  removeCB,
  storyId,
}: {
  collectionId: string;
  removeCB?: () => void;
  storyId?: string;
}) => {
  const isLoading = useDisclosure();

  const removeCollection = () => {
    isLoading.onOpen();
    const fun: any = storyId
      ? buildCollectionApi({
          storyId,
          removeFrom: [collectionId],
          addTo: [],
        })
      : deleteCollection(collectionId);
    fun
      .then(() => {
        removeCB && removeCB();
      })
      .finally(() => isLoading.onClose());
  };
  return (
    <TSIconButton
      isRound
      icon={<DeleteIcon />}
      aria-label="delete"
      size="xs"
      colorScheme="red"
      onClick={removeCollection}
      isLoading={isLoading.isOpen}
    />
  );
};

export default RemoveBtn;
