import AllUsers from '@compo/AllUsers';
import DashboardHeader from '@compo/DashboardHeader';
import { getCookieFromServer } from '@lib/cookies';
import UserType from '@lib/types/UserType';
import axios from 'axios';
import { GetServerSideProps } from 'next';

const Index = ({ users }: { users: UserType[] }) => {
  return (
    <>
      <DashboardHeader type="allUsers" header="Admin Dashboard" />
      <AllUsers users={users} />
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
      data: { users },
    } = await axios.get<{ users: UserType[] }>(
      `${process.env.API_URL}/admin?data=users`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      props: {
        users,
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
