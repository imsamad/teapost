import {
  AspectRatio,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

import StoryType from '@lib/types/StoryType';
import AuthorCard from '@compo/AuthorCard';
import { StoryReaderActions } from '@compo/StoryActions';
import UserType from '@lib/types/UserType';
import { placeholderImage, readAbleDate } from '@lib/utils';
import Content from './Content';
import FallbackImage from '@compo/FallbackImage';
import TPImage from '@compo/TPImage';
const SingleStory = ({
  story,
  author,
}: {
  story: StoryType;
  author: UserType;
}) => {
  return (
    <Stack spacing={4} p={2}>
      <AuthorCard author={author} displayFull={false} />
      <Heading size="xl">{story?.title}</Heading>
      <Heading size="md" color="gray.300">
        {story?.subtitle}
      </Heading>
      <HStack fontWeight={400} wordBreak="keep-all">
        <Text wordBreak="keep-all">{readAbleDate(story.updatedAt, true)}</Text>
        <Text>~</Text>
        <Text wordBreak="keep-all">{story.readingTime} min read </Text>
      </HStack>
      <TPImage
        src={story.titleImage}
        width={400}
        height={300}
        alt={story.title}
      />

      <StoryReaderActions
        storyId={story._id}
        noOfLikes={story.noOfLikes || 0}
        noOfDislikes={story.noOfDislikes || 0}
        noOfComments={story.noOfComments || 0}
        share={{
          title: story.title,
          text: story.subtitle,
          url: '/story/' + story.slug,
        }}
      />
      <Content storyId={story._id} />
    </Stack>
  );
};

export default SingleStory;
