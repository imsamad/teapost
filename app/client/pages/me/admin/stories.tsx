import AllStories from '@compo/AllStories';
import DashboardHeader from '@compo/DashboardHeader';
import { getCookieFromServer } from '@lib/cookies';
import StoryType from '@lib/types/StoryType';
import UserType from '@lib/types/UserType';
import axios from 'axios';
import { GetServerSideProps } from 'next';

const Index = ({ stories }: { stories: StoryType[] }) => {
  return (
    <>
      <DashboardHeader type="allStories" header="Admin Dashboard" />
      <AllStories stories={stories} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
    } = await axios.get<{ stories: UserType[] }>(
      `${process.env.API_URL}/admin?data=stories`,
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
