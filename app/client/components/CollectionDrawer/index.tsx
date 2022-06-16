import useSWR from 'swr';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Spinner,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { RiShieldStarFill } from 'react-icons/ri';
import { StoryCollectionType } from '@lib/types/StoryCollectionType';
import CollectionList from './CollectionList';
import { useAuthCtx } from '@compo/Context';
import TSButton from '@compo/UI/TSButton';
import NewCollectionBtn from './NewCollectionBtn';

const Index = ({ storyId }: { storyId: string }) => {
  const { auth, loginModal } = useAuthCtx();

  const drawer = useDisclosure();

  const { data, isValidating } = useSWR<{
    mycollections: StoryCollectionType[];
  }>(() => auth?.user?._id && '/collections/my');

  return (
    <>
      <IconButton
        aria-label="add-to-collection"
        icon={<RiShieldStarFill />}
        size="sm"
        variant="outline"
        colorScheme="blue"
        outline="none"
        isLoading={drawer.isOpen && isValidating}
        border="0"
        _focus={{
          outline: 'none',
          border: 'none',
        }}
        onClick={drawer.onOpen}
      />

      <Drawer
        size="md"
        isOpen={drawer.isOpen}
        placement="right"
        onClose={drawer.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            My Story collections
          </DrawerHeader>
          <DrawerBody p="2">
            {!auth?.user?._id ? (
              <VStack>
                <Heading fontSize="md">Please Login first</Heading>
                <TSButton
                  onClick={loginModal.onOpen}
                  colorScheme="blue"
                  size="sm"
                >
                  Login
                </TSButton>
              </VStack>
            ) : (
              <>
                <NewCollectionBtn />
                {isValidating ? (
                  <HStack justifyContent="center" my={2}>
                    <Spinner
                      thickness="4px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="sm"
                    />
                  </HStack>
                ) : data?.mycollections.length ? (
                  <>
                    <CollectionList
                      storyId={storyId}
                      initialCollections={data?.mycollections}
                      pageNo={2}
                    />
                  </>
                ) : (
                  <VStack>
                    <Heading fontSize="md" p={4}>
                      It seeems you didn{`'`}t have any reading collection
                      created yet.{' '}
                    </Heading>
                  </VStack>
                )}
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Index;
