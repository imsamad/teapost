/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Heading, HStack, Spinner, Text } from '@chakra-ui/react';

import useSWR from 'swr';

import { StoryCollectionType } from '@lib/types/StoryCollectionType';

import CollectionCard from './CollectionCard';
import useInfinite from '@compo/Hooks/useInfinite';

const Index = ({
  initialMycollections,
  pageNo,
}: {
  initialMycollections?: StoryCollectionType[];
  pageNo: number;
}) => {
  if (initialMycollections) {
    return (
      <>
        {initialMycollections?.map((collection) => (
          <CollectionCard key={collection._id} collection={collection} />
        ))}
        <Index pageNo={2} />
      </>
    );
  }

  const { data, isValidating } = useSWR<{
    mycollections: StoryCollectionType[];
    pagination: { next: number; prev: number; limit: number };
  }>(`/collections/my?page=${pageNo}`);

  const { isInViewRef, show } = useInfinite({
    ignore: false,
  });
  if (isValidating) {
    return (
      <HStack justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="sm"
        />
      </HStack>
    );
  }
  if (!isValidating && !data?.pagination.next) {
    return <></>;
  }
  return (
    <>
      <div ref={isInViewRef} />
      {!show ? (
        <HStack justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="sm"
          />
        </HStack>
      ) : (
        <>
          {data?.mycollections?.map((collection) => (
            <CollectionCard key={collection._id} collection={collection} />
          ))}
          <Index pageNo={pageNo + 1} />
        </>
      )}
    </>
  );
};

export default Index;
