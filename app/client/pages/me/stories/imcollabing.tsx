import { Box } from '@chakra-ui/react';
import DashboardHeader from '@compo/DashboardHeader';
import IMCollabing from '@compo/IMCollabing';
import { getCookieFromServer } from '@lib/cookies';
import StoryType from '@lib/types/StoryType';
import axios from 'axios';
import { GetServerSideProps } from 'next';

const Index = ({ stories }: { stories: StoryType[] }) => {
  return (
    <>
      <DashboardHeader type="imcollabing" />
      <IMCollabing stories={stories} />
    </>
  );
};

export default Index;

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
      `${process.env.API_URL}/stories/iamcollabing`,
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
