import { HStack, Spacer } from "@chakra-ui/react";
import storyType from "../../../lib/types/storyType";

import Author from "./Author";
import StoryInfo from "./StoryInfo";

const index = ({
  story: { author, tags, createdAt },
}: {
  story: storyType;
}) => {
  return (
    <HStack>
      <Author author={author} />
      <Spacer />
      <StoryInfo tag={tags[0]} createdAt={createdAt} />
    </HStack>
  );
};

export default index;
