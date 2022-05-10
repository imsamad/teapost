import axios from 'axios';
import { InferGetStaticPropsType } from 'next';

import Stories from '../components/Stories';
import storyType from '@lib/types/StoryType';

const Index = ({ stories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Stories
        initialStories={stories}
        // isInitial={true}
        nextPageNo={1}
        query="/stories?populate=author,tags&"
      />
      {/* <Stories stories={stories} /> */}
    </>
  );
};

export const getStaticProps = async () => {
  const { data } = await axios.get<{ stories: storyType[] }>(
    `${process.env.API_URL}/stories?page=1&populate=author,tags`
  );

  return {
    props: {
      stories: data.stories,
    },
    revalidate: 10,
  };
};

export default Index;
