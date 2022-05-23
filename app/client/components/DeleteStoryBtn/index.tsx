import { DeleteIcon } from '@chakra-ui/icons';
import { Button, useDisclosure } from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';
import { deleteManyStoriesApi } from '@lib/api/storyApi';

const DeleteStoryBtn = ({
  storyIds,
  postDeleteCB,
}: {
  storyIds: string[];
  postDeleteCB?: any;
}) => {
  const isDeleting = useDisclosure();
  const handleDelete = () => {
    var res = confirm('Do you eant do delete?');
    if (!res) return;
    isDeleting.onOpen();
    deleteManyStoriesApi(storyIds)
      .then(() => {
        postDeleteCB && postDeleteCB();
      })
      .catch(() => {})
      .finally(() => {
        isDeleting.onClose();
      });
  };
  return (
    <TSButton
      size="sm"
      colorScheme="red"
      onClick={handleDelete}
      isLoading={isDeleting.isOpen}
      loadingText="Deleting..."
      leftIcon={<DeleteIcon />}
    >
      Delete {storyIds.length > 1 && 'All'}
    </TSButton>
  );
};

export default DeleteStoryBtn;
