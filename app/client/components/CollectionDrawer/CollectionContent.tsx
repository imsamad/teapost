import {
  Button,
  DrawerBody,
  Heading,
  useDisclosure,
  useToast,
  VStack,
  Divider,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import { useAuthCtx, useProfile } from '@compo/Context';
import { buildCollectionApi } from '@lib/api/collectionApi';
import CollectionFooter from './CollectionFooter';
import NewCollectionBtn from './NewCollectionBtn';
import CollectionRow from './CollectionRow';

const Content = ({ storyId }: { storyId: string }) => {
  const { myProfile, mutateProfile } = useProfile();
  //   extract collId of which current SelectStory is part of

  const storyPartOf: string[] =
    //  If story is selected , plus logged in
    storyId && myProfile?._id
      ? myProfile.profile?.storyCollections
        ? myProfile.profile?.storyCollections
            ?.filter((collection) => collection.stories.includes(storyId))
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
  const loadingState = useDisclosure();

  const toast = useToast();

  const handleSubmit = async () => {
    const finalObj = {
      addTo: sendObj.storyPartOf.filter((coll) => !storyPartOf.includes(coll)),
      removeFrom: sendObj.removeFrom.filter((coll) =>
        storyPartOf.includes(coll)
      ),
      storyId,
    };
    if (!finalObj.addTo.length && !finalObj.removeFrom.length) {
      toast({
        status: 'warning',
        position: 'bottom',
        isClosable: true,
        title: 'No change',
        variant: 'top-accent',
      });
      return;
    }

    loadingState.onOpen();
    buildCollectionApi(finalObj)
      .then(() => {
        toast({
          status: 'success',
          position: 'bottom',
          isClosable: true,
          title: 'Saved',
          variant: 'top-accent',
          duration: 600,
        });
        mutateProfile();
        loadingState.onClose();
      })
      .catch(() => {
        toast({
          status: 'error',
          position: 'bottom',
          isClosable: true,
          title: 'Unable tosave, please try again',
          duration: 600,
          variant: 'top-accent',
        });
        loadingState.onClose();
      });
  };

  const { loginModal } = useAuthCtx();
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
            <Button onClick={loginModal.onOpen} colorScheme="blue" size="sm">
              Login
            </Button>
          </VStack>
        ) : (
          <>
            <NewCollectionBtn />
            <Heading fontSize="md" textAlign="center" my="2">
              Add To
            </Heading>
            <Divider />
            {myProfile?.profile?.storyCollections?.map((collection) => (
              <CollectionRow
                key={collection._id}
                sendObj={sendObj}
                isDisabled={!storyId}
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
