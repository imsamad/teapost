import { HStack, Spacer } from '@chakra-ui/react';
import storyType from '@lib/types/StoryType';

import Author from './Author';
import StoryInfo from './StoryInfo';
import { useRouter } from 'next/router';
const Index = ({ story }: { story: storyType }) => {
  const router = useRouter();
  const tag =
    router?.query?.tag ||
    story.tags.sort((a, b) => a.title.length - b.title.length)[0].title;

  return (
    <HStack>
      <Author author={story.author} />
      <Spacer />
      <StoryInfo
        tag={tag}
        createdAt={story.createdAt}
        readingTime={story.readingTime}
      />
    </HStack>
  );
};

export default Index;
