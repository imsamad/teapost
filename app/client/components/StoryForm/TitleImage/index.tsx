import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Spacer,
  Text,
  useBoolean,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { useRef } from 'react';
import { FiFile } from 'react-icons/fi';
import { typeOf } from '../../../lib/utils';
const File = () => {
  const {
    values: { titleImage },
    errors: { titleImage: titleImageError },
    touched: { titleImage: titleImageTouched },
  } = useFormikContext();

  const inputRef: any = useRef();
  const isError = Boolean(titleImageError && titleImageTouched);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useBoolean(false);

  const handleUpload = () => {
    if (!inputRef?.current?.files.length) return;
    const file = inputRef.current.files[0];
    // setIsLoading.on();
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = async () => {
      console.log(fileReader.result);
      try {
        toast({
          title: 'Image uploaded',
          position: 'bottom',
          variant: 'subtle',
          status: 'success',
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: 'Image uploading failed',
          position: 'bottom',
          variant: 'subtle',
          status: 'error',
          isClosable: true,
        });
      }
    };
  };

  return (
    <FormControl isInvalid={isError} size="sm">
      <FormLabel>Upload Title Image</FormLabel>
      <HStack>
        <InputGroup size="sm">
          <InputLeftAddon>
            <Icon as={FiFile} />
          </InputLeftAddon>
          <input
            type="file"
            accept="image/*"
            name="image"
            style={{ display: 'none' }}
            ref={inputRef}
          />
          <Input
            border="2px solid red"
            placeholder={
              titleImage
                ? 'Click To Select Image'
                : 'Click To Upload Title Image'
            }
            onClick={(e: any) => {
              console.log('e.target ', e.target);
              inputRef.current.click();
            }}
          />
        </InputGroup>
        <Flex>
          <Button
            size="xs"
            mr="8px"
            onClick={handleUpload}
            isLoading={isLoading}
          >
            Upload
          </Button>
          {titleImage && (
            <>
              <Button size="xs" onClick={onOpen}>
                View
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton />
                  <Image src={titleImage} alt="Dan Abramov" />
                  <ModalFooter>
                    <Text mr="5px">Title Image</Text>
                    <Spacer />
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={onClose}
                      size="sm"
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
        </Flex>
      </HStack>
      {/* @ts-ignore */}
      {isError && typeOf(titleImageError, 'array') ? (
        // @ts-ignore
        [...new Set(titleImageError)].map((err: string) => (
          <FormErrorMessage key={err}>{err}</FormErrorMessage>
        ))
      ) : (
        <FormErrorMessage>{titleImageError}</FormErrorMessage>
      )}
    </FormControl>
  );
};
export default File;
