import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";

const FormModel = () => {
  return (
    <ModalContent>
      <ModalHeader>Create your account</ModalHeader>
      {/* <ModalCloseButton /> */}
      <ModalBody pb={6}></ModalBody>

      <ModalFooter>
        <Button colorScheme="blue" mr={3}>
          Save
        </Button>
        <Button>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default FormModel;
