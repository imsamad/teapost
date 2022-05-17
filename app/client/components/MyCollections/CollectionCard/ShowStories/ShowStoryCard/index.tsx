import { Box, HStack } from '@chakra-ui/react';
import StoryCard from '@compo/StoryCard';
import StoryType from '@lib/types/StoryType';
import React, { useState } from 'react';
import RemoveBtn from '../../RemoveBtn';

const ShowStoryCard = ({
  story: storyTemp,
  collectionId,
}: {
  story: StoryType;
  collectionId: string;
}) => {
  const [story, setStory] = useState(storyTemp);
  return (
    <>
      {story && (
        <Box mt={4} position="relative">
          <Box pos="absolute" left="0" bottom="-10px">
            <RemoveBtn
              storyId={story._id}
              collectionId={collectionId}
              // @ts-ignore
              removeCB={() => setStory(null)}
            />
          </Box>
          <StoryCard story={story} />
        </Box>
      )}
    </>
  );
};

export default ShowStoryCard;
