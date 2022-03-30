import { Box, Heading, HStack, Icon } from "@chakra-ui/react";
import { GiQuill } from "react-icons/gi";
import { GetServerSideProps } from "next";
import axios from "axios";

import StoryForm from "@compo/StoryForm";
import StoryType from "@lib/types/StoryType";

import { getCookieFromServer } from "@lib/cookies";

const Index = ({ story }: { story: StoryType }) => {
  return (
    <Box p={[0, 4]}>
      <HStack justifyContent="center">
        <Icon as={GiQuill} />
        <Heading textAlign="center" m="2" size="lg">
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
}) => {
  // @ts-ignore
  const storyId = params.storyId;
  const accessToken = await getCookieFromServer(req.cookies);

  if (!accessToken) {
    return {
      redirect: {
        destination: `/auth?redirectTo=/me/stories/edit/${storyId}`,
        permanent: true,
      },
    };
  }

  try {
    const {
      data: { story },
    } = await axios.get<{ story: StoryType }>(
      `${process.env.API_URL}/stories/${storyId}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      props: {
        story,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default Index;
