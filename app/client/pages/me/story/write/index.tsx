// import { GetServerSideProps } from 'next';
// import { applyServerSideCookie } from 'next-universal-cookie';
// import StoryForm from '../../../../components/StoryForm';
import router from 'next/router';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
const Index = () => {
  useEffect(() => {
    router.replace(`/me/story/write/${nanoid()}`);
  });
  return 'redirect...'; // return <StoryForm />;
};

export default Index;
// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   applyServerSideCookie(req, res);
//   const allCookies = req.cookies;

//   // console.log('allCookies ', allCookies);
//   const userAuthCookie = process.env.AUTH_SESSION as string;
//   const refreshTokenCookie = process.env.REFRESH_AUTH_SESSION as string;
//   console.log('======================');
//   console.log('user ', allCookies[userAuthCookie]);
//   console.log('refreshToken ', allCookies[refreshTokenCookie]);
//   console.log('----------------------');
//   res.cookie('xyz', 'jjjjjjjjjjjjjjj');
//   return {
//     props: {},
//   };
//   // cookies.set(userAuthCookie, userValue);
//   // cookies.set(refreshTokenCookie, refToken);
// };
