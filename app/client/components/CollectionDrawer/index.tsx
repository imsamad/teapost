import { ChangeEvent, useEffect, useState } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Heading,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuthCtx, useProfile } from "../Context";

import Footer from "./Footer";
import Body from "./Body";
import { addToCollection } from "../../lib/authApi";

const Index = ({
  storySelected,
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  storySelected: string;
}) => {
  const { profile } = useProfile();
  const { login } = useAuthCtx();

  const partOf: any =
    storySelected && profile.id
      ? profile?.storyCollections
          ?.filter(
            (collection) =>
              collection.stories.includes(storySelected) && collection._id
          )
          .map((coll) => coll._id)
      : [];
  const [sendObj, setSendObj] = useState<{
    addTo: string[];
    removeFrom: string[];
  }>({
    addTo: [],
    removeFrom: [],
  });
  useEffect(() => {
    setSendObj({ removeFrom: [], addTo: partOf });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storySelected]);
  const toast = useToast();
  const {
    isOpen: isSaving,
    onOpen: onSavingOpen,
    onClose: onSavingClose,
  } = useDisclosure();
  const handleSubmit = async () => {
    const finalObj = {
      addTo: sendObj.addTo.filter((coll) => !partOf.includes(coll)),
      removeFrom: sendObj.removeFrom.filter((coll) => partOf.includes(coll)),
    };
    if (!finalObj.addTo.length && !finalObj.removeFrom.length)
      toast({
        status: "warning",
        position: "bottom",
        isClosable: true,
        title: "No change",
        variant: "top-accent",
      });
    else {
      onSavingOpen();
      addToCollection(finalObj, storySelected)
        .then(() => {
          toast({
            status: "success",
            position: "bottom",
            isClosable: true,
            title: "Saved",
            variant: "top-accent",
          });
          onSavingClose();
        })
        .catch(() => {
          toast({
            status: "error",
            position: "bottom",
            isClosable: true,
            title: "Unable tosave, please try again",
            variant: "top-accent",
          });
          onSavingClose();
        });
    }
  };
  return (
    <Drawer size="xs" isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          My Story collections
        </DrawerHeader>

        <DrawerBody p="2">
          {!profile.id ? (
            <VStack>
              <Heading fontSize="md">Please Login first</Heading>
              <Button onClick={login.onOpen} colorScheme="blue" size="sm">
                Login
              </Button>
            </VStack>
          ) : (
            <Body
              sendObj={sendObj}
              storySelected={storySelected}
              setSendObj={setSendObj}
            />
          )}
        </DrawerBody>

        {profile.id && <Footer handleSubmit={handleSubmit} isOpen={isSaving} />}
      </DrawerContent>
    </Drawer>
  );
};

export default Index;
