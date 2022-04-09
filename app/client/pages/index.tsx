import axios from "axios";
import { InferGetStaticPropsType } from "next";

import Stories from "../components/Stories";
import storyType from "@lib/types/StoryType";

const Index = ({ stories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Stories
        initialStories={stories}
        // isInitial={true}
        nextPageNo={2}
        query="/stories?"
      />
      {/* <Stories stories={stories} /> */}
    </>
  );
};

export const getStaticProps = async () => {
  const { data } = await axios.get<{ stories: storyType[] }>(
    `${process.env.API_URL}/stories?nocontent=true&page=1`
  );

  return {
    props: {
      stories: data.stories,
    },
    revalidate: 10,
  };
};

export default Index;
