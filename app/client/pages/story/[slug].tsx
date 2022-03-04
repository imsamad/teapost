import { Box } from '@chakra-ui/react';
// import axios from 'axios';

const Index = () => {
  // console.log('story ', story);
  return <Box border="2px solid pink">Ok from single story by slug</Box>;
};

// const apiUrl = process.env.API_URL;

// export const getStaticPaths = async () => {
//   const {
//     data: { stories },
//   } = await axios.get(`${apiUrl}/stories`);

//   const paths = stories.map((story: any) => ({
//     params: { slug: story.id || story._id },
//   }));

//   return { paths, fallback: true };
// };

// export const getStaticProps = async ({ params }: any) => {
//   const {
//     data: { stories },
//   } = await axios.get(`${apiUrl}/stories?slug=${params.slug}`);

//   return {
//     props: {
//       story: stories[0],
//     },
//   };
// };

export default Index;
