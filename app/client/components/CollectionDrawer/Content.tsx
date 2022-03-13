import {
  Button,
  DrawerBody,
  Heading,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useAuthCtx, useProfile } from "@compo/Context";
import { addToCollection } from "@lib/api/authApi";
import { useState } from "react";

import Body from "./Body";
import Footer from "./Footer";

const Content = ({ storySelected }: { storySelected: string }) => {
  const { profile } = useProfile();
  //   extract collId of which crtSelectStory is part of
  const partOf: any =
    storySelected && profile._id
      ? profile?.storyCollections
          ?.filter(
            (
              collection // @ts-ignore
            ) => collection.stories.includes(storySelected) && collection._id
          )
          .map((coll) => coll._id)
      : [];

  const [sendObj, setSendObj] = useState<{
    addTo: string[];
    removeFrom: string[];
  }>({
    addTo: partOf,
    removeFrom: [],
  });

  // useEffect(() => {
  //   setSendObj({ removeFrom: [], addTo: partOf });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [storySelected]);

  const savingStates = useDisclosure();

  const toast = useToast();
  const handleSubmit = async () => {
    const finalObj = {
      addTo: sendObj.addTo.filter((coll) => !partOf.includes(coll)),
      removeFrom: sendObj.removeFrom.filter((coll) => partOf.includes(coll)),
    };
    if (!finalObj.addTo.length && !finalObj.removeFrom.length) {
      toast({
        status: "warning",
        position: "bottom",
        isClosable: true,
        title: "No change",
        variant: "top-accent",
      });
    } else {
      savingStates.onOpen();
      addToCollection(finalObj, storySelected)
        .then(() => {
          toast({
            status: "success",
            position: "bottom",
            isClosable: true,
            title: "Saved",
            variant: "top-accent",
          });
          savingStates.onClose();
        })
        .catch(() => {
          toast({
            status: "error",
            position: "bottom",
            isClosable: true,
            title: "Unable tosave, please try again",
            variant: "top-accent",
          });
          savingStates.onClose();
        });
    }
  };

  const { login } = useAuthCtx();

  return (
    <>
      <DrawerBody p="2">
        {!profile._id ? (
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

      {profile._id && (
        <Footer handleSubmit={handleSubmit} isOpen={savingStates.isOpen} />
      )}
    </>
  );
};

export default Content;
