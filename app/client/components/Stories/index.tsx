import {
  Box,
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import useSWR from 'swr';

import StoryType from '@lib/types/StoryType';
import UserType from '@lib/types/UserType';

import StoryCard from '../StoryCard';
import ShowStoryCard from '../MyCollections/CollectionCard/ShowStories/ShowStoryCard';

const Stories = ({
  initialStories,
  query = '',
  isInitial = false,
  nextPageNo,
  collectionId,
}: {
  initialStories?: StoryType[];
  query?: string;
  isInitial?: boolean;
  collectionId?: string;
  nextPageNo: number;
}) => {
  const { data, isValidating } = useSWR<{
    stories: StoryType[];
    authors: UserType[];
    pagination: { next: number; prev: number; limit: number };
  }>(() => !initialStories && `${query}page=${nextPageNo}`);

  const [show, setShow] = useState(false);

  const lastDivRef: any = useRef();
  const isInView = useCallback((node) => {
    if (initialStories || !nextPageNo) {
      return;
    }
    lastDivRef.current = new IntersectionObserver(
      async (entries, observerInst) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          lastDivRef?.current?.disconnect(node);
          observerInst?.unobserve(entries[0].target);
        }
      }
    );
    if (node) lastDivRef?.current?.observe(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container maxW="container.md" p="0">
      <div ref={initialStories ? null : isInView} />
      {initialStories ? (
        <>
          {initialStories?.map((story: StoryType) =>
            collectionId ? (
              <ShowStoryCard
                story={story}
                key={story._id}
                collectionId={collectionId}
              />
            ) : (
              <StoryCard story={story} key={story._id} />
            )
          )}
          <Stories
            nextPageNo={nextPageNo + 1}
            query={query}
            collectionId={collectionId}
          />
        </>
      ) : !show || isValidating ? (
        <HStack justifyContent="center" my={2}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="sm"
          />
        </HStack>
      ) : data?.stories?.length ? (
        <>
          {data?.stories?.map((story: StoryType) =>
            collectionId ? (
              <ShowStoryCard
                story={story}
                key={story._id}
                collectionId={collectionId}
              />
            ) : (
              <StoryCard story={story} key={story._id} />
            )
          )}
          <Stories
            nextPageNo={nextPageNo + 1}
            query={query}
            collectionId={collectionId}
          />
        </>
      ) : (
        !isValidating && <Text textAlign="center"> The End </Text>
      )}
    </Container>
  );
};

export default Stories;
const Server = () => (
  <Box
    maxW="400px"
    p="15px"
    borderRadius="md"
    mx="auto"
    bgColor="gray.300"
    color="pink.500"
  >
    <Heading fontSize="md">Sorry, server is updating right now...</Heading>
  </Box>
);
