import { HStack, Spacer } from "@chakra-ui/react";
import storyType from "@lib/types/StoryType";

import Author from "./Author";
import StoryInfo from "./StoryInfo";

const index = ({ story }: { story: storyType }) => {
  return (
    <HStack>
      <Author author={story.author} />
      <Spacer />
      <StoryInfo tag={story.tags[0]} createdAt={story.createdAt} />
    </HStack>
  );
};

export default index;
