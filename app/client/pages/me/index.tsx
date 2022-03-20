import Profile from "@compo/Profile/Profile";
import { GetServerSideProps } from "next";
import { applyServerSideCookie } from "next-universal-cookie";

const Index = () => <Profile />;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}): Promise<any> => {
  applyServerSideCookie(req, res);
  const allCookies = req.cookies;
  const userAuthCookie = process.env.AUTH_SESSION as string;

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
