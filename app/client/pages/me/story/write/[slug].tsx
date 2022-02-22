import { Box, Heading, HStack, Icon } from '@chakra-ui/react';
import { GiQuill } from 'react-icons/gi';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { applyServerSideCookie } from 'next-universal-cookie';

import StoryForm from '../../../../components/StoryForm';
import axios, { AxiosRequestConfig } from 'axios';

const Index = ({
  story,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
}): Promise<any> => {
  applyServerSideCookie(req, res);
  const allCookies = req.cookies;
  const userAuthCookie = process.env.AUTH_SESSION as string,
    refreshTokenCookie = process.env.REFRESH_AUTH_SESSION as string;

  // @ts-ignore
  const slug = params.slug;
  if (!allCookies[userAuthCookie]) {
    return {
      redirect: {
        destination: `/auth?redirectTo=/me/story/write/${slug}`,
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
