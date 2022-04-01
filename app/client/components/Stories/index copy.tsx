import { Box, Container, Heading } from "@chakra-ui/react";

import StoryType from "@lib/types/StoryType";
import StoryCard from "../StoryCard";

const Index = ({
  stories,
  query,
}: {
  stories: StoryType[];
  query?: string;
}) => {
  return (
    <Container maxW="container.md" p="0">
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
    </Container>
  );
};

export default Index;