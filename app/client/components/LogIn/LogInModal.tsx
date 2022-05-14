import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Divider,
} from '@chakra-ui/react';

import Form from './Form';
import MyLink from '../MyLink';
import { useAuthCtx } from '../Context';

const LoginModal = ({ isOpen, onClose }: any) => {
  const { loginModal } = useAuthCtx();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent borderRadius="lg" py="5">
        <ModalCloseButton />
        <ModalBody borderRadius="lg">
          <Form redirectTo="" />
          <Divider mt="2" />
        </ModalBody>
        <ModalFooter>
          <MyLink
            onClick={() => {
              loginModal.onClose();
            }}
            href="/auth"
            sx={{
              color: 'blue.600',
              fontStyle: 'italic',
              fontSize: 'xs',
              textDecor: 'underline',
              _dark: {
                color: 'teal.400',
              },
            }}
          >
            Go To Login Page
          </MyLink>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
