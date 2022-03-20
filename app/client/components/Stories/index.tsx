import { Box, Heading } from "@chakra-ui/react";

import StoryType from "@lib/types/StoryType";
import StoryCard from "../StoryCard";

const Index = ({ stories }: { stories: StoryType[] }) => {
  return (
    <Box mx="auto" maxW={["100%", "100%", "70%"]}>
      {stories.length > 0 ? (
        stories.map((story: StoryType) => (
          <StoryCard story={story} key={story._id} />
        ))
      ) : (
        <Box
          maxW="400px"
          p="15px"
          borderRadius="md"
          mx="auto"
          bgColor="gray.300"
          color="pink.500"
        >
          <Heading fontSize="md">
            Sorry, server is updating right now...
          </Heading>
        </Box>
      )}
    </Box>
  );
};

export default Index;
