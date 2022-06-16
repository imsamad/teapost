import { Box, HStack, Stack } from '@chakra-ui/react';

import { StoryReaderActions } from '@compo/StoryActions';
import MyLink from '@compo/MyLink';
import StoryType from '@lib/types/StoryType';
import TPImage from '@compo/TPImage';
import StoryContentText from './StoryContentText';

const StoryContent = ({ story }: { story: StoryType }) => {
  return (
    <HStack border="0px solid aqua">
      <Stack pr="15px" flex="1" border="0px dashed red">
        <StoryContentText story={story} />
        <StoryReaderActions story={story} />
      </Stack>
      <MyLink href={`/story/${story.slug}`}>
        <Box
          border="0px solid green"
          minW="85px"
          overflow="hidden"
          w={['110px', '120px', '200px']}
          zIndex={2}
        >
          <TPImage
            maxW={'200px'}
            src={story.titleImage}
            alt={story.title}
            width={'200px'}
            height={'130px'}
          />
        </Box>
      </MyLink>
    </HStack>
  );
};

export default StoryContent;
