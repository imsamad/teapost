import axios from 'axios';
import { GetServerSideProps } from 'next';

import { getCookieFromServer } from '@lib/cookies';
import { StoryCollectionType } from '@lib/types/StoryCollectionType';

import DashboardHeader from '@compo/DashboardHeader';
import MyCollections from '@compo/MyCollections';
import { Container } from '@chakra-ui/react';

const Index = ({ mycollections }: { mycollections: StoryCollectionType[] }) => {
  return (
    <>
      <DashboardHeader type="collections" />
      <MyCollections
        initialMycollections={mycollections}
        isInitial={true}
        nextPageNo={2}
      />
    </>
  );
};

Index.getContainer = function getContainer(page: any) {
  return (
    <Container maxW="container.lg" my={2}>
      {page}
    </Container>
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
      data: { mycollections },
    } = await axios.get<{ mycollections: StoryCollectionType[] }>(
      `${process.env.API_URL}/collections/my`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      props: {
        mycollections,
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
