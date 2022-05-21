import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import UserType from '@lib/types/UserType';
import useSWR from 'swr';
import UserList from './UserList';

const UsersListModal = (props: {
  onClose: () => void;
  isOpen: boolean;
  checkedUsers: string[];
  onClickCB?: (userId: string, isChecked: boolean) => Promise<boolean>;
  onlyShowUsers?: UserType[];
}) => {
  const { data } = useSWR<{
    users: UserType[];
    pagination: { next: number; prev: number; limit: number };
  }>(() => !props.onlyShowUsers && `/users`);

  return (
    <Modal
      size="md"
      isCentered
      closeOnOverlayClick={false}
      onClose={props.onClose}
      isOpen={props.isOpen}
      motionPreset="slideInRight"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent border="0px" p="0">
        <ModalHeader>Collab With</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {props.isOpen && (
            <UserList
              initialUsers={data?.users}
              onClickCB={props.onClickCB}
              checkedUsers={props.checkedUsers}
              crtPageNo={1}
              onlyShowUsers={props.onlyShowUsers}
            />
          )}
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default UsersListModal;
