import { HStack } from "@chakra-ui/react";
import StoryCard from "@compo/StoryCard";
import StoryType from "@lib/types/StoryType";
import React, { useState } from "react";
import RemoveBtn from "../../RemoveBtn";

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
        <HStack mt={4}>
          <RemoveBtn
            storyId={story._id}
            collectionId={collectionId}
            // @ts-ignore
            removeCB={() => setStory(null)}
          />
          <StoryCard story={story} />
        </HStack>
      )}
    </>
  );
};

export default ShowStoryCard;
