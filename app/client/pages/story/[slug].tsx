import axios from "axios";

import StoryType from "@lib/types/StoryType";
import SingleStory from "@compo/SingleNews";
import UserType from "@lib/types/UserType";

const Index = ({ story, author }: { story: StoryType; author: UserType }) => {
  if (!story) {
    return "Loading...";
  }
  return <SingleStory story={story} author={author} />;
};

const apiUrl = process.env.API_URL!;

export const getStaticPaths = async () => {
  const {
    data: { stories },
  } = await axios.get<{ stories: StoryType[] }>(`${apiUrl}/stories`);

  const paths = stories.map((story: any) => ({
    params: { slug: story.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: any) => {
  const {
    data: { stories },
  } = await axios.get<{ stories: StoryType[] }>(
    `${apiUrl}/stories?slug=${params.slug}`
  );

  return {
    props: {
      story: stories[0],
      author: stories[0].author,
    },
    revalidate: 10,
  };
};

export default Index;
