import {
  Avatar,
  Button,
  Checkbox,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function TransitionExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal
        size="sm"
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInRight"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent border="2px" p="0">
          <ModalHeader>
            <Input />
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
            <User />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default TransitionExample;
const User = () => (
  <HStack
    mb="4px"
    py="8px"
    borderBottom="1px"
    borderColor="gray.100"
    outline="2px"
  >
    <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
    <Stack justifyContent="center">
      <Text color="muted" size="sm">
        Full Name
      </Text>
      <Heading size="sm">username</Heading>
    </Stack>
    <Spacer />
    <Checkbox size="lg" />
  </HStack>
);
