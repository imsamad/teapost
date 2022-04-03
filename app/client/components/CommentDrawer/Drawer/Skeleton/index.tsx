import {
  Box,
  Flex,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";

const CommentSkeleton = () => (
  <Box overflow="hidden" h="100%">
    {Array.from(Array(20).keys()).map((key: any) => (
      <Flex my="1" key={key}>
        <SkeletonCircle fadeDuration={0.9} speed={0.8} size="10" />
        <Stack flex="1" p="1">
          <Skeleton
            fadeDuration={0.9}
            speed={0.8}
            h="0.75rem"
            border="2px"
            justifySelf="stretch"
          />
          <Skeleton
            fadeDuration={0.9}
            speed={0.8}
            h="1rem"
            border="2px"
            justifySelf="stretch"
            w="75%"
          />
          <HStack>
            <Skeleton
              fadeDuration={0.9}
              speed={0.8}
              h="1rem"
              w="1rem"
              border="2px"
              justifySelf="stretch"
            />
            <Skeleton
              fadeDuration={0.9}
              speed={0.8}
              h="1rem"
              w="1rem"
              border="2px"
              justifySelf="stretch"
            />
            <Skeleton
              fadeDuration={0.9}
              speed={0.8}
              h="1rem"
              w="3rem"
              border="2px"
              justifySelf="stretch"
            />
          </HStack>
        </Stack>
      </Flex>
    ))}
  </Box>
);
export default CommentSkeleton;
