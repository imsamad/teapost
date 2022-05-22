import { DeleteIcon } from '@chakra-ui/icons';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useAuthCtx } from '@compo/Context';
import TSButton from '@compo/UI/TSButton';
import { deleteMeApi } from '@lib/api/storyApi';
import { useRouter } from 'next/router';

const DeleteAccount = () => {
  const isDeleting = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const { logout } = useAuthCtx();
  const handleDelete = () => {
    var res = confirm('Do you want do delete your account permanently?');
    if (!res) return;

    deleteMeApi()
      .then(() => {
        logout();
        router.replace('/auth');
      })
      .catch(() => {
        toast({
          status: 'error',
          title: 'Please try agian, server is under maintenance',
          isClosable: true,
        });
      });
  };
  return (
    <TSButton
      my={2}
      isFullWidth
      leftIcon={<DeleteIcon />}
      isLoading={isDeleting.isOpen}
      loadingText="Deleting..."
      size="sm"
      onClick={handleDelete}
      colorScheme="red"
    >
      Delete Account
    </TSButton>
  );
};

export default DeleteAccount;
