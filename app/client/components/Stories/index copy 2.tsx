import {
  Box,
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";

import StoryType from "@lib/types/StoryType";
import {
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useSWR from "swr";
import StoryCard from "../StoryCard";

const Index = ({
  stories: initialStories,
  query,
  isInitial = false,
  nextPageNo,
}: {
  stories?: StoryType[];
  query?: string;
  isInitial?: boolean;
  nextPageNo: number;
}) => {
  const [count, setCount] = useState(0);

  const { data, isValidating, mutate } = useSWR<{
    stories: StoryType[];
    pagination: { next: number; prev: number };
  }>(() => count == 1 && `/stories?page=${nextPageNo}`);

  console.log(count, "nextPageNo", nextPageNo, "data ", data);

  const observer: any = useRef();
  const isInView = useCallback((node) => {
    if (isInitial || !nextPageNo) return;
    observer.current = new IntersectionObserver(async (entries) => {
      if (entries[0].isIntersecting) {
        // console.log("one");
        // ++count;
        setCount(1);
        mutate().then(() => setCount(2));
        observer?.current?.disconnect(node);
        observer?.current?.unobserve(node);
      }
    });
    if (node) observer?.current?.observe(node);
  }, []);
  return (
    <Container maxW="container.md" p="0">
      <div ref={isInView} />
      {initialStories && initialStories?.length > 0 ? (
        <>
          {initialStories?.map((story: StoryType) => (
            <StoryCard story={story} key={story._id} />
          ))}
          <Index nextPageNo={2} />
        </>
      ) : data && data?.stories?.length ? (
        <>
          {data?.stories?.map((story: StoryType) => (
            <StoryCard story={story} key={story._id} />
          ))}
          <Index nextPageNo={data?.pagination?.next} />
        </>
      ) : isValidating ? (
        <HStack justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </HStack>
      ) : (
        <Text textAlign="center"> The End </Text>
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
