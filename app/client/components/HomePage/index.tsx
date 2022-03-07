import { Box, Grid, GridItem } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import StoryCard from "../StoryCard";

const Index = ({ stories }: any) => {
  return stories.map((story: any) => (
    <Box mx="auto" maxW={["100%", "100%", "70%"]} key={story.id}>
      <StoryCard key={`${nanoid()}`} story={story} />
    </Box>
  ));
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
