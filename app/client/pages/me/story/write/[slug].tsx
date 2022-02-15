import { Box, Heading, HStack, Icon } from '@chakra-ui/react';
import { GiQuill } from 'react-icons/gi';
import { GetServerSideProps } from 'next';
import { applyServerSideCookie } from 'next-universal-cookie';

import StoryForm from '../../../../components/StoryForm';
import axios, { AxiosRequestConfig } from 'axios';

const Index = ({ story }: any) => {
  return (
    <Box p={[0, 4]}>
      <HStack justifyContent="center">
        <Icon as={GiQuill} />
        <Heading textAlign="center" mx="2" size="lg">
          Write a story
        </Heading>
      </HStack>
      <StoryForm story={story} />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
  query,
}): Promise<any> => {
  applyServerSideCookie(req, res);
  const allCookies = req.cookies;
  const userAuthCookie = process.env.AUTH_SESSION as string,
    refreshTokenCookie = process.env.REFRESH_AUTH_SESSION as string;

  // @ts-ignore
  const slug = params.slug || query.slug;
  if (!allCookies[userAuthCookie]) {
    return {
      redirect: {
        destination: `/auth?redirectTo=/me/story/create/${slug}`,
        permanent: false,
      },
    };
  }
  // @ts-ignore
  const accessToken = JSON.parse(allCookies[userAuthCookie]).accessToken,
    refToken = allCookies[refreshTokenCookie];

  const axiosArgs: AxiosRequestConfig = {
    method: 'POST',
    url: process.env.API_URL + '/story',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'x-ref-token': refToken,
    },
    data: {
      slug,
    },
  };

  try {
    const { data } = await axios(axiosArgs);

    return {
      props: {
        story: data.data,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default Index;
