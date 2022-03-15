import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
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
} from "@chakra-ui/react";
import { useField } from "formik";
import { BiImageAdd } from "react-icons/bi";
import { useState } from "react";

import { CustomError } from "../../FormFields";
import uploadImage from "@lib/api/uploadImage";

const File = () => {
  const [, meta, helpers] = useField("titleImage");
  const [file, setFile] = useState<File>();
  const titleImage = meta.value;

  const isError = Boolean(meta.error && meta.touched);

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useBoolean(false);

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading.on();
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      helpers.setValue(imageUrl);
      toast({
        title: "Image uploaded",
        position: "bottom",
        variant: "subtle",
        status: "success",
        isClosable: true,
      });
      setIsLoading.off();
    } else {
      toast({
        title: "Image uploading failed",
        position: "bottom",
        variant: "subtle",
        status: "error",
        isClosable: true,
      });
      setIsLoading.off();
    }
  };

  const oneMB = 1_000_000;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    const selectedFile = e.target.files[0];

    if (selectedFile?.size < oneMB * 4) {
      helpers.setTouched(false, false);
      helpers.setError("");
      setFile(selectedFile);
    } else {
      setFile(undefined);
      helpers.setTouched(true, false);
      helpers.setError("Max image size is 4Mb");
    }
  };

  const size = "sm";
  return (
    <FormControl isInvalid={isError} size="sm">
      <FormLabel>Upload Title Image</FormLabel>
      <Flex w="100%" alignItems="center" wrap="wrap">
        <Flex flex="1" border="2px" borderColor="gray.300">
          <InputGroup size={size}>
            <InputLeftAddon>
              <BiImageAdd size="1rem" />
            </InputLeftAddon>
            <Flex
              alignItems="center"
              w="100%"
              _hover={{
                bgColor: "#ddd",
              }}
              transition="background"
            >
              <input
                type="file"
                onChange={handleChange}
                style={{ display: "none" }}
                id="imageUpload"
                accept="image/*"
                multiple={false}
              />
              <Text
                pl="8px"
                flex="1"
                as="label"
                cursor="pointer"
                htmlFor="imageUpload"
                isTruncated
              >
                {/* @ts-ignore */}
                {file?.name || "Select Image"}
              </Text>
            </Flex>
          </InputGroup>
        </Flex>
        <Button
          size={size}
          mx="8px"
          onClick={handleUpload}
          isLoading={isLoading}
          loadingText="Saving..."
          disabled={!file}
        >
          Upload
        </Button>
        {titleImage && (
          <>
            <Button size={size} onClick={onOpen}>
              View
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <Image src={titleImage} alt="titleImage" />
                <ModalFooter>
                  <Text mr="5px">Title Image</Text>
                  <Spacer />
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={onClose}
                    size={size}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        )}
      </Flex>
      {/* @ts-ignore */}
      <CustomError isError={isError} errors={meta.error} />
    </FormControl>
  );
};
export default File;
