import { useDisclosure } from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';
import UsersListModal from '@compo/UsersListModal';
import UserType from '@lib/types/UserType';
import React from 'react';
import { FcCollaboration } from 'react-icons/fc';

const CollabingWith = ({ users }: { users: UserType[] }) => {
  const modal = useDisclosure();
  return (
    <>
      <TSButton
        mr="8px"
        _focus={{
          outline: 'none',
        }}
        colorScheme="green"
        variant="outline"
        leftIcon={<FcCollaboration />}
        onClick={modal.onOpen}
        rightIcon={<>{users.length}</>}
      >
        Collabing with
      </TSButton>
      <UsersListModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        onlyShowUsers={users}
        checkedUsers={users.map(({ _id }: any) => _id)}
      />
    </>
  );
};

export default CollabingWith;
