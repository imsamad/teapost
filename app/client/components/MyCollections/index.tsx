import {
  Box,
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { useCallback, useRef, useState } from "react";
import useSWR from "swr";

import { StoryCollectionType } from "@lib/types/StoryCollectionType";

import CollectionCard from "./CollectionCard";

const Index = ({
  initialMycollections,
  isInitial = false,
  nextPageNo,
}: {
  initialMycollections?: StoryCollectionType[];
  isInitial?: boolean;
  nextPageNo: number;
}) => {
  const { data } = useSWR<{
    mycollections: StoryCollectionType[];
    pagination: { next: number; prev: number; limit: number };
  }>(() => !isInitial && `/collections/my?page=${nextPageNo}`);

  const [show, setShow] = useState(false);

  const observer: any = useRef();
  const isInView = useCallback((node) => {
    if (isInitial || !nextPageNo) {
      return;
    }
    observer.current = new IntersectionObserver(
      async (entries, observerInst) => {
        if (entries[0].isIntersecting) {
          setShow(true);
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
      {initialMycollections ? (
        <>
          {initialMycollections?.length ? (
            <>
              {initialMycollections?.map((collection) => (
                <CollectionCard key={collection._id} collection={collection} />
              ))}
              <Index nextPageNo={2} />
            </>
          ) : (
            <Text textAlign="center" my={3}>
              No collection
            </Text>
          )}
        </>
      ) : !show ? (
        <HStack justifyContent="center">
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
          {data?.mycollections?.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
          <Index nextPageNo={nextPageNo + 1} />
        </>
      ) : (
        <Text textAlign="center"> {``}</Text>
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
