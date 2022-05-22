import MyStories from '@compo/MyStories';

import DashboardHeader from '@compo/DashboardHeader';
import axios from 'axios';
import StoryType from '@lib/types/StoryType';
import { GetServerSideProps } from 'next';
import { getCookieFromServer } from '@lib/cookies';

const Index = ({ stories }: { stories: StoryType[] }) => {
  return (
    <>
      <DashboardHeader type="stories" />
      <MyStories stories={stories} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  // @ts-ignore
  const accessToken = await getCookieFromServer(req.cookies);

  if (!accessToken) {
    return {
      redirect: {
        destination: `/auth?redirectTo=/me`,
        permanent: true,
      },
    };
  }

  try {
    const {
      data: { stories },
    } = await axios.get<{ stories: StoryType[] }>(
      `${process.env.API_URL}/stories/my`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      props: {
        stories,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default Index;
