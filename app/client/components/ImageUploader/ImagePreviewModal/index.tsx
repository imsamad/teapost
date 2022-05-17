import {
  Button,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import { uploadImage } from '@lib/api/imageApi';

const ImagePreviewModal = ({
  isOpen,
  onClose,
  file,
  imageUploadCB,
}: {
  isOpen: boolean;
  onClose: () => void;
  file: File;
  imageUploadCB: (url: string) => void;
}) => {
  const isLoading = useDisclosure();
  const toast = useToast();
  const handleUploadImage = async () => {
    isLoading.onOpen();
    uploadImage(file)
      .then(({ result }) => {
        imageUploadCB(result[0].src);
      })
      .catch((err) => {
        toast({
          status: 'error',
          title: 'Unable to upload plz try again',
          variant: 'top-accent',
          position: 'bottom',
          isClosable: true,
        });
      })
      .finally(() => {
        isLoading.onClose();
        onClose();
      });
  };
  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={() => onClose()}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Title Image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid gridColumn="repeat(1,1fr)">
            <Image
              src={URL.createObjectURL(file)}
              alt="Dan Abramov"
              fallbackSrc="https://bit.ly/dan-abramov"
            />
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            mr={3}
            variant="outline"
            colorScheme="red"
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            isLoading={isLoading.isOpen}
            loadingText="Saving..."
            variant="solid"
            colorScheme="blue"
            onClick={handleUploadImage}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ImagePreviewModal;
