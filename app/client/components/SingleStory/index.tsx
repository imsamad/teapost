import { Heading, HStack, Stack, Text } from '@chakra-ui/react';

import StoryType from '@lib/types/StoryType';
import AuthorCard from '@compo/AuthorCard';
import { StoryReaderActions } from '@compo/StoryActions';
import UserType from '@lib/types/UserType';
import { readAbleDate } from '@lib/utils';
import Content from './Content';
import TPImage from '@compo/TPImage';
const SingleStory = ({
  story,
  author,
}: {
  story: StoryType;
  author: UserType;
}) => {
  // console.log('author ', author);
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
        maxW="full"
        aspectRatio={1}
        src={story.titleImage}
        width={400}
        height={300}
        alt={story.title}
      />

      <StoryReaderActions story={story} />
      <Content storyId={story._id} />
    </Stack>
  );
};

export default SingleStory;
