import {
  FormLabel,
  HStack,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { BsArrowsFullscreen } from 'react-icons/bs';

import Quill from './Quill';
import Error from '../../FormFields/CustomError';

const Index = () => {
  let {
    errors: { body: bodyErrors },
    touched: { body: bodyTouched },
  } = useFormikContext();
  const isError = Boolean(bodyErrors && bodyTouched);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack>
        <FormLabel>Write...</FormLabel>
        <Spacer />
        <IconButton
          size="sm"
          aria-label="full-screen-quill-editor"
          icon={<BsArrowsFullscreen />}
          onClick={onOpen}
        />
      </HStack>
      {/* @ts-ignore */}
      <Error isError={isError} errors={bodyErrors} />
      <Quill />
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Quill />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Index;
