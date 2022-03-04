import { Box, Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { applyServerSideCookie } from 'next-universal-cookie';

import useUser from '../../lib/useUser';

const Index = () => {
  const { user, logout } = useUser({ redirectTo: '/auth' });
  return (
    <Box maxW="md" mx="auto">
      <h1> {JSON.stringify(user, null, 4)} Profile</h1>
      <br />
      <br />
      <br />
      <Button onClick={() => logout()}> Logout </Button>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}): Promise<any> => {
  applyServerSideCookie(req, res);
  const allCookies = req.cookies;
  const userAuthCookie = process.env.AUTH_SESSION as string,
    refreshTokenCookie = process.env.REFRESH_AUTH_SESSION as string;

  // @ts-ignore
  if (!allCookies[userAuthCookie]) {
    return {
      redirect: { destination: `/auth?redirectTo=/me`, permanent: true },
    };
  }

  return {
    props: {},
  };
};

export default Index;
