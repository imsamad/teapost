import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
} from "@chakra-ui/react";
import { ImageUrlType } from "@lib/types/ImageType";
import useSWR from "swr";

const ImageGallery = ({
  isOpen,
  onClose,
  onClickCb,
}: {
  isOpen: boolean;
  onClose: () => void;
  onClickCb: (cb: string) => void;
}) => {
  const { data, error, isValidating } = useSWR<{ result: ImageUrlType[] }>(
    () => isOpen && "/image"
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Image Gallery</ModalHeader>
        <ModalCloseButton />
        <ModalBody flexWrap="wrap">
          <Box
            display={["block", "block", "grid"]}
            gridTemplateColumns="repeat(2,1fr)"
            gridAutoRows="auto"
          >
            {isValidating ? (
              Array.from(Array(10).keys()).map((val) => (
                <Box key={val} p="2" borderRadius="md" overflow="hidden">
                  <Skeleton maxH="200px" w="full" h="200px" />
                </Box>
              ))
            ) : data?.result.length == 0 ? (
              <Heading
                fontSize="md"
                fontStyle="italic"
                py="8"
                textAlign="center"
                w="full"
              >
                Gallery is empty...
              </Heading>
            ) : (
              data?.result.map((image) => (
                <Box key={image.id} p="2">
                  <Box
                    onClick={() => {
                      onClickCb(image.src!);
                      onClose();
                    }}
                    key={image.id}
                    border="1px"
                    _hover={{
                      outline: "2px solid blue",
                    }}
                    borderRadius="md"
                    position="relative"
                    overflow="hidden"
                  >
                    <Image key={image.id} src={image.src} alt={image.caption} />
                    <Heading
                      position="absolute"
                      bottom="0"
                      w="full"
                      bgColor="rgba(255,255,255,0.8)"
                      fontSize="md"
                      fontWeight={900}
                      color="gray.600"
                      mt="2"
                      fontStyle="italic"
                      pl="2"
                      py="1"
                    >
                      {image.caption}
                    </Heading>
                  </Box>
                </Box>
              ))
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageGallery;
