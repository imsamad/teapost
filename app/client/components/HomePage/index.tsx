import { Box } from "@chakra-ui/react";

import storyType from "../../lib/types/StoryType";
import StoryCard from "../StoryCard";

const Index = ({ stories }: { stories: storyType[] }) => {
  return (
    <>
      {stories.map((story: storyType) => (
        <Box mx="auto" maxW={["100%", "100%", "70%"]} key={story._id}>
          <StoryCard story={story} />
        </Box>
      ))}
    </>
  );
  // return (
  //   <Grid templateColumns="repeat(12,1fr)">
  //     <GridItem colStart={[1, 1, 3]} colSpan={[12, 12, 8]}>
  //       {stories.map((story: any) => (
  //         <StoryCard key={`${nanoid()}`} story={story} />
  //       ))}
  //     </GridItem>
  //   </Grid>
  // );
};

export default Index;
