import {
  Box,
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { getStories } from "@lib/api/storyApi";

import StoryType from "@lib/types/StoryType";
import { useCallback, useRef, useState } from "react";

import StoryCard from "../StoryCard";

const Index = ({
  stories,
  query = "",
  isInitial = false,
  nextPageNo,
}: {
  stories?: StoryType[];
  query?: string;
  isInitial?: boolean;
  nextPageNo: number;
}) => {
  const [data, setData] = useState<{ stories: StoryType[]; noResult: boolean }>(
    { stories: stories ?? [], noResult: false }
  );

  const observer: any = useRef();
  const isInView = useCallback((node) => {
    if (isInitial || !nextPageNo) {
      return;
    }
    observer.current = new IntersectionObserver(
      async (entries, observerInst) => {
        if (entries[0].isIntersecting) {
          let data = await getStories(nextPageNo, query);
          if (!data.pagination.next || !data.stories.length)
            setData({ noResult: true, stories: [] });
          else setData({ stories: data.stories, noResult: false });
          observer?.current?.disconnect(node);
          observerInst?.unobserve(entries[0].target);
        }
      }
    );
    if (node) observer?.current?.observe(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container maxW="container.md" p="0">
      <div ref={isInitial ? null : isInView} />
      {data && data?.stories.length ? (
        <>
          {data?.stories?.map((story: StoryType) => (
            <StoryCard story={story} key={story._id} />
          ))}
          <Index nextPageNo={nextPageNo + 1} query={query} />
        </>
      ) : data.noResult ? (
        <Text textAlign="center"> The End </Text>
      ) : (
        <HStack justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </HStack>
      )}
    </Container>
  );
};

export default Index;
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
