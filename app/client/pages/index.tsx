import HomePage from '../components/HomePage';
import CheckResp from '../components/CheckResp';
import Category from '../components/Category';
// @ts-ignore
import axios from 'axios';
import { Box } from '@chakra-ui/react';
const Index = () => {
  return (
    <Box border="0px solid aqua">
      {/* <Category /> */}
      <CheckResp />

      <HomePage />
    </Box>
  );
};

// export const getStaticProps = async () => {
//   const { data: stories } = await axios(`${process.env.API_URL}/story`);
//   console.log('stories ', stories);
//   return {
//     props: {
//       stories,
//     },
//   };
// };

export default Index;
