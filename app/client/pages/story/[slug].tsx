import { Box, Heading } from "@chakra-ui/react";
import axios from "axios";

import StoryType from "@lib/types/StoryType";
import Header from "@compo/LogIn/Form/Header";
import Renderer from "@compo/Renderer";

const Index = ({ story }: { story: StoryType }) => {
  console.log("story ", story);
  if (!story) {
    return "Loading...";
  }
  return (
    <Box border="2px solid pink" p={10}>
      <Heading fontSize="3xl" as="h1">
        {story.title}
      </Heading>
      <Heading my="4" size="md" fontWeight={800} color="rgba(41,41,41,0.4)">
        {story.subtitle}
      </Heading>
      <Renderer value={story.content} />
    </Box>
  );
};

const apiUrl = process.env.API_URL!;

export const getStaticPaths = async () => {
  const {
    data: { stories },
  } = await axios.get(`${apiUrl}/stories`);

  const paths = stories.map((story: any) => ({
    params: { slug: story._id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: any) => {
  const {
    data: { stories },
  } = await axios.get(`${apiUrl}/stories?slug=${params.slug}`);

  return {
    props: {
      story: stories[0],
    },
  };
};

export default Index;
