import {
  AspectRatio,
  Container,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import Render from "@compo/Renderer";
import StoryType from "@lib/types/StoryType";
import AuthorCard from "@compo/AuthorCard";
import StoryActions from "@compo/StoryActions";
import UserType from "@lib/types/UserType";
import { readAbleDate } from "@lib/utils";
import Content from "./Content";
const SingleStory = ({
  story,
  author,
}: {
  story: StoryType;
  author: UserType;
}) => {
  return (
    <Container maxW="container.md" border="0px" p={4}>
      <Stack spacing={4}>
        <AuthorCard author={author} displayFull={false} />
        <Heading size="xl">{story?.title}</Heading>
        <Heading size="md" color="gray.300">
          {story?.subtitle}
        </Heading>
        <HStack fontWeight={400} wordBreak="keep-all">
          <Text wordBreak="keep-all">
            {readAbleDate(story.updatedAt, true)}
          </Text>
          <Text>~</Text>
          <Text wordBreak="keep-all">{story.readingTime} min read </Text>
        </HStack>
        <AspectRatio maxW="full" ratio={4 / 3}>
          <Image src={story.titleImage} alt={story.title} />
        </AspectRatio>
        <StoryActions
          storyId={story._id}
          noOfLikes={story.noOfLikes || 0}
          noOfDislikes={story.noOfDislikes || 0}
          noOfComments={story.noOfComments || 0}
        />
        <Content storyId={story._id} />
      </Stack>
    </Container>
  );
};

export default SingleStory;
