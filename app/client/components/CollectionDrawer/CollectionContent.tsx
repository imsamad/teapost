import {
  Button,
  DrawerBody,
  Heading,
  useDisclosure,
  useToast,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { useAuthCtx, useProfile } from "@compo/Context";
import { addToCollection } from "@lib/api/authApi";
import { ChangeEvent, useState } from "react";

import CollectionFooter from "./CollectionFooter";

import NewCollection from "../NewCollection";
import CollectionRow from "./CollectionRow";
const Content = ({ storySelected }: { storySelected: string }) => {
  const { myProfile } = useProfile();
  //   extract collId of which current SelectStory is part of

  const storyPartOf: string[] =
    //  If story is selected , plus logged in
    storySelected && myProfile?._id
      ? myProfile?.storyCollections
        ? myProfile?.storyCollections
            ?.filter((collection) => collection.stories.includes(storySelected))
            .map((coll) => coll._id)
        : []
      : [];

  const [sendObj, setSendObj] = useState<{
    storyPartOf: string[];
    removeFrom: string[];
  }>({
    storyPartOf,
    removeFrom: [],
  });
  // useEffect(() => {
  //   setSendObj({ removeFrom: [], addTo: storyPartOf });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [storySelected]);

  const loadingState = useDisclosure();

  const toast = useToast();

  const handleSubmit = async () => {
    const finalObj = {
      addTo: sendObj.storyPartOf.filter((coll) => !storyPartOf.includes(coll)),
      removeFrom: sendObj.removeFrom.filter((coll) =>
        storyPartOf.includes(coll)
      ),
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
      loadingState.onOpen();
      addToCollection(finalObj, storySelected)
        .then(() => {
          toast({
            status: "success",
            position: "bottom",
            isClosable: true,
            title: "Saved",
            variant: "top-accent",
          });
          loadingState.onClose();
        })
        .catch(() => {
          toast({
            status: "error",
            position: "bottom",
            isClosable: true,
            title: "Unable tosave, please try again",
            variant: "top-accent",
          });
          loadingState.onClose();
        });
    }
  };

  const { login } = useAuthCtx();
  const handleChange =
    (collId: string) => (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSendObj((pre) => ({
          ...pre,
          removeFrom: pre.removeFrom.filter((coll: string) => coll != collId),
          storyPartOf: [...pre.storyPartOf, collId],
        }));
      } else {
        setSendObj((pre) => ({
          ...pre,
          storyPartOf: pre.storyPartOf.filter((coll: string) => coll != collId),
          removeFrom: [...pre.removeFrom, collId],
        }));
      }
    };

  return (
    <>
      <DrawerBody p="2">
        {!myProfile._id ? (
          <VStack>
            <Heading fontSize="md">Please Login first</Heading>
            <Button onClick={login.onOpen} colorScheme="blue" size="sm">
              Login
            </Button>
          </VStack>
        ) : (
          <>
            <NewCollection />
            <Heading fontSize="md" textAlign="center" my="2">
              Add To
            </Heading>
            <Divider />
            {myProfile?.storyCollections?.map((collection) => (
              <CollectionRow
                key={collection._id}
                sendObj={sendObj}
                isDisabled={!storySelected}
                handleChange={handleChange(collection._id)}
                collection={collection}
              />
            ))}
          </>
        )}
      </DrawerBody>

      {myProfile._id && (
        <CollectionFooter
          handleSubmit={handleSubmit}
          isOpen={loadingState.isOpen}
        />
      )}
    </>
  );
};

export default Content;
