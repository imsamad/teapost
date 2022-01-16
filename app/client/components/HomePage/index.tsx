import { Grid, GridItem } from '@chakra-ui/react';

import NewsCard from '../NewsCard';

const Index = () => {
  const arr = Array.from(Array(10).keys());
  return (
    <Grid templateColumns="repeat(12,1fr)">
      <GridItem colSpan={[12, 12, 8]}>
        {arr.map((val) => (
          <NewsCard key={`${(val + 10) * 10}`} />
        ))}
      </GridItem>
      <GridItem
        bg="papayawhip"
        colSpan={[0, 0, 4]}
        display={['none', null, 'block']}
      >
        Right
      </GridItem>
    </Grid>
  );
};

export default Index;
