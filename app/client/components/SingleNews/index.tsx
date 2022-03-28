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
import StoryActions from "@compo/StoryCard/StoryActions";
import UserType from "@lib/types/UserType";
import { readAbleDate } from "@lib/utils";

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
        <AuthorCard author={author} displayStats={false} />
        <Heading size="xl">{story?.title}</Heading>
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
