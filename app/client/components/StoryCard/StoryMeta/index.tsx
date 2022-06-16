import { HStack, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import storyType from '@lib/types/StoryType';

import StoryAuthor from './StoryAuthor';
import StoryMetaInfo from './StoryMetaInfo';

const StoryMeta = ({ story }: { story: storyType }) => {
  const router = useRouter();

  // Select shortest tags from story.tag array.
  const shortestTag =
    router?.query?.tag ||
    story.tags.sort((a, b) => a.title.length - b.title.length)[0].title;

  return (
    <HStack border="0px">
      <StoryAuthor author={story.author} />
      <Spacer />
      <StoryMetaInfo
        tag={shortestTag}
        createdAt={story.createdAt}
        readingTime={story.readingTime}
      />
    </HStack>
  );
};

export default StoryMeta;
