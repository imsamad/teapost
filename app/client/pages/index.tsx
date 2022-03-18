// import CheckResp from "../components/CheckResp";
import HomePage from "../components/HomePage";
import axios from "axios";
import { InferGetStaticPropsType } from "next";
import storyType from "../lib/types/StoryType";

export const getStaticProps = async () => {
  const {
    data: { stories },
  }: { data: { stories: storyType[] } } = await axios(
    `${process.env.API_URL}/stories`
  );

  return {
    props: {
      stories,
    },
    revalidate: 10,
  };
};
const Index = ({ stories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <HomePage stories={stories} />;
};
export default Index;
