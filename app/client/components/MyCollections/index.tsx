import {
  Box,
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
} from '@chakra-ui/react';

import useSWR from 'swr';

import { StoryCollectionType } from '@lib/types/StoryCollectionType';

import CollectionCard from './CollectionCard';
import useInfinite from '@compo/Hooks/useInfinite';

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

  const { isInViewRef, show } = useInfinite({
    ignore: !!initialMycollections || !nextPageNo,
  });
  return (
    <>
      <div ref={isInitial ? null : isInViewRef} />
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
    </>
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
