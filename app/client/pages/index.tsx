import { Grid } from '@chakra-ui/react';
import NewsCard from '../components/NewsCard';

const Index = () => {
  const arr = Array.from(Array(10).keys());
  return (
    <Grid templateColumns={{ base: `repeat(1, 1fr)`, md: `repeat(2, 1fr)` }}>
      {arr.map((val) => (
        <NewsCard key={`${(val + 10) * 10}`} />
      ))}
    </Grid>
  );
};

export default Index;
