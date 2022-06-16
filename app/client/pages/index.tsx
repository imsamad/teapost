import axios from 'axios';
import { InferGetStaticPropsType } from 'next';

import storyType from '@lib/types/StoryType';
import StoryList from '@compo/StoryList';

const Index = ({ stories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <StoryList initialStories={stories} pageNo={2} />;
};

export const getStaticProps = async () => {
  const { data } = await axios.get<{ stories: storyType[] }>(
    `${process.env.API_URL}/stories`
  );

  return {
    props: {
      stories: data.stories,
    },
    revalidate: 10,
  };
};

export default Index;
