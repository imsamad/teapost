import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Form from './Form';

const LoginModal = ({ isOpen, onClose }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent borderRadius="lg" mx="1">
        <ModalCloseButton />
        <ModalBody pb={6} border="0px" py="16" borderRadius="lg">
          <Form redirectTo="" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
