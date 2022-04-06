import { ExternalLinkIcon } from "@chakra-ui/icons";
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
  useToast,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { collabWithApi } from "@lib/api/storyApi";
import UserType from "@lib/types/UserType";
import { useField } from "formik";
import { useState } from "react";
import useSWR from "swr";

const Index = (props: {
  onClose: () => void;
  isOpen: boolean;
  users: UserType[];
}) => {
  const [{ value: storyId }] = useField("_id");

  const [{ value: collabWith }, {}, { setValue: setCollab }] =
    useField<string[]>("collabWith");
  const [state, setState] = useState<string[]>(collabWith);

  const onChange = (str: string) => {
    setState((pre) =>
      pre.includes(str) ? pre.filter((p) => p != str) : [...pre, str]
    );
  };

  const isLoading = useDisclosure();
  const toast = useToast();
  const handleSubmit = () => {
    const finalObj = {
      collabWith: state.filter((id) => !collabWith.includes(id)),
      uncollabWith: collabWith.filter((id) => !state.includes(id)),
    };
    if (!finalObj.collabWith.length && !finalObj.uncollabWith.length) {
      toast({
        status: "warning",
        variant: "top-accent",
        title: "No changes",
        isClosable: true,
      });
      return;
    }
    isLoading.onOpen();
    collabWithApi(storyId, finalObj)
      .then(() => {
        props.onClose();
        setCollab(state, false);
        toast({
          status: "success",
          title: "Saved changes",
          variant: "top-accent",
          isClosable: true,
        });
      })
      .finally(() => {
        isLoading.onClose();
      });
  };
  return (
    <Modal
      size="sm"
      isCentered
      onClose={props.onClose}
      isOpen={props.isOpen}
      motionPreset="slideInRight"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent border="0px" p="0">
        <ModalHeader>
          {/* <Input /> */}
          Collab With
        </ModalHeader>
        <ModalBody>
          {props.users.map((user) => {
            return (
              <User
                key={user._id}
                user={user}
                onChange={onChange}
                isChecked={!!state?.includes(user._id)}
              />
            );
          })}
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            onClick={props.onClose}
            variant="ghost"
            colorScheme="red"
          >
            Close
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            isLoading={isLoading.isOpen}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Index;

const User = ({
  user,
  onChange,
  isChecked,
}: {
  user: UserType;
  onChange: (str: string) => void;
  isChecked: boolean;
}) => {
  return (
    <HStack
      mb="4px"
      py="8px"
      borderBottom="1px"
      borderColor="gray.100"
      outline="2px"
    >
      <Avatar name={user.fullName} src={user.profilePic} />
      <Stack justifyContent="center">
        <Text color="muted" size="sm">
          {user.fullName}
        </Text>
        <Heading size="sm">{user.username}</Heading>
      </Stack>
      <Spacer />
      <Link href={`/@/${user.username}`} isExternal>
        <ExternalLinkIcon mx="6px" />
      </Link>
      <Checkbox
        size="lg"
        onChange={() => onChange(user._id)}
        isChecked={isChecked}
      />
    </HStack>
  );
};
