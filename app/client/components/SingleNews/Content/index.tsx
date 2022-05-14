import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';
import Render from '@compo/Renderer';
import StoryType from '@lib/types/StoryType';

import React from 'react';
import useSWR from 'swr';

const Index = ({ storyId }: { storyId: string }) => {
  const isClientSide = typeof window !== 'undefined';

  const { data, isValidating } = useSWR<{ story: StoryType }>(
    () => isClientSide && `/stories/${storyId}`
  );

  return (
    <>
      {isValidating ? (
        <Box overflow="hidden" minH="500px" position="relative">
          {Array.from(Array(20).keys()).map((key) => (
            <TSSkeleton key={key} />
          ))}
        </Box>
      ) : (
        <Render
          value={data?.story?.content || '<h1>No Content available yet.</h1>'}
        />
      )}
    </>
  );
};

export default Index;
const TSSkeleton = () => (
  <>
    <Skeleton h="1rem" w="25%" startColor="gray.100" endColor="gray.300" />
    <SkeletonText
      noOfLines={8}
      my="4"
      // position="absolute"
      size="md"
      startColor="gray.100"
      endColor="gray.300"
    />
  </>
);
