import { Grid, GridItem } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import StoryCard from '../StoryCard';

const Index = ({ stories }: any) => {
  return (
    <Grid templateColumns="repeat(12,1fr)">
      <GridItem colStart={[1, 1, 2]} colSpan={[12, 12, 9]}>
        {stories.map((story: any) => (
          <StoryCard key={`${nanoid()}`} story={story} />
        ))}
      </GridItem>
    </Grid>
  );
};

export default Index;
