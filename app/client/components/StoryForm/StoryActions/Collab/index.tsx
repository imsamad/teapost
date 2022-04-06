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
import UserType from "@lib/types/UserType";
import { useField } from "formik";
import { useState } from "react";
import { FcCollaboration } from "react-icons/fc";
import useSWR from "swr";
import UserModal from "./UserModal";

function Index() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useSWR<{ users: UserType[] }>("/users");

  const [{ value: collabWith }] = useField<string[]>("collabWith");
  return (
    <>
      <Button
        mr="8px"
        _focus={{
          outline: "none",
        }}
        colorScheme="green"
        variant="outline"
        onClick={onOpen}
        leftIcon={<FcCollaboration />}
        // @ts-ignore
        size="md"
        rightIcon={<>{collabWith.length}</>}
      >
        Collab
      </Button>
      <UserModal users={data?.users || []} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Index;
