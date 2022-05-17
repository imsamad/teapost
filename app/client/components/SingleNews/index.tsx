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
import StoryActions from '@compo/StoryActions';
import UserType from '@lib/types/UserType';
import { placeholderImage, readAbleDate } from '@lib/utils';
import Content from './Content';
import FallbackImage from '@compo/FallbackImage';
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
      <AspectRatio maxW="full" ratio={4 / 3}>
        <Image
          src={story.titleImage}
          alt={story.title}
          fallbackSrc={placeholderImage(400, 300)}
          fallback={
            <FallbackImage
              width={400}
              height={300}
              tryAgain={story.titleImage}
              title={story.title}
            />
          }
        />
      </AspectRatio>
      <StoryActions
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
