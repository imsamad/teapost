import {
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import Render from "@compo/Renderer";
import StoryType from "@lib/types/StoryType";
import Author from "./Author";
import StoryActions from "@compo/StoryCard/StoryActions";

const SingleStory = ({ story }: { story: StoryType }) => {
  return (
    <Container maxW="container.md" border="0px" p={4}>
      <Stack spacing={4}>
        <Author />
        <Heading size="xl">{story?.title}</Heading>
        <HStack fontWeight={400} wordBreak="keep-all">
          <Text wordBreak="keep-all">March 16, 2012</Text>
          <Text>~</Text>
          <Text wordBreak="keep-all">9 min read</Text>
        </HStack>
        <Image src={story.titleImage} w="100%" alt={story.title} maxH="500px" />
        <StoryActions
          storyId={story._id}
          like={story?.meta?.likedBy?.length || 0}
          dislike={story?.meta?.dislikedBy?.length || 0}
          displayFull={true}
          btnSize="sm"
        />

        <Render value={story.content} />
      </Stack>
    </Container>
  );
};

export default SingleStory;
