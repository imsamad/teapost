import axios from "axios";
import { GetServerSideProps } from "next";

import { getCookieFromServer } from "@lib/cookies";
import { StoryHistoryType } from "@lib/types/StoryHistoryType";
import StoryHistory from "@compo/StoryHistory";

const Index = ({ storyHistory }: { storyHistory: StoryHistoryType }) => {
  return <StoryHistory storyHistory={storyHistory} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const accessToken = await getCookieFromServer(req.cookies);
  //   @ts-ignore
  const storyId = params.storyId;
  if (!accessToken) {
    return {
      redirect: {
        destination: `/auth?redirectTo=/me/stories/history/${storyId}`,
        permanent: true,
      },
    };
  }
  try {
    const { data } = await axios.get<{ storyHistory: StoryHistoryType }>(
      `${process.env.API_URL}/storyhistories/${storyId}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      props: {
        storyHistory: data.storyHistory,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default Index;
