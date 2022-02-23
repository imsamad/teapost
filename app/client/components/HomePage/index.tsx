import { Grid, GridItem } from '@chakra-ui/react';
import StoryCard from '../StoryCard';

const Index = ({ stories }: any) => {
  const arr = Array.from(Array(10).keys());

  return (
    <Grid templateColumns="repeat(12,1fr)">
      <GridItem colStart={[1, 1, 2]} colSpan={[12, 12, 9]}>
        {arr.map((val) => (
          <StoryCard key={`${(val + 10) * 10}`} story={stories[0]} />
        ))}
      </GridItem>
    </Grid>
  );
};

export default Index;
