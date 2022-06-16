import { Box, Heading, Stack } from '@chakra-ui/react';
import MyLink from '@compo/MyLink';
import StoryType from '@lib/types/StoryType';
import React from 'react';

const StoryContentText = ({ story }: { story: StoryType }) => {
  return (
    <MyLink href={`/story/${story.slug}`} scroll={false}>
      <Stack role="group">
        <Heading
          // my="4px"
          as="h1"
          fontWeight={700}
          fontSize="md"
          color="rgb(41,41,41)"
          textOverflow="ellipsis"
          noOfLines={[3, 2]}
          _dark={{
            color: 'gray.200',
          }}
          _groupHover={{ color: 'rgba(41,41,41,0.8)' }}
        >
          {story.title}
        </Heading>

        <Box display={['none', 'none', '-webkit-box']}>
          <Heading
            my="8px"
            as="h1"
            fontWeight={500}
            fontSize="lg"
            color="rgb(117,117,117)"
            noOfLines={[0, 1, 2]}
            textOverflow="ellipsis"
            _dark={{
              color: 'gray.300',
            }}
            _groupHover={{ color: 'rgba(117,117,117,0.7)' }}
          >
            {story.subtitle}
          </Heading>
        </Box>
      </Stack>
    </MyLink>
  );
};

export default StoryContentText;
