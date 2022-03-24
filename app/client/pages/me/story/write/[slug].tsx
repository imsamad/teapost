import { Box, Heading, HStack, Icon } from "@chakra-ui/react";
import { GiQuill } from "react-icons/gi";
import { GetServerSideProps } from "next";
import axios from "axios";

import StoryForm from "../../../../components/StoryForm";
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
  const slug = params.slug;
  const accessToken = await getCookieFromServer(req.cookies);

  if (!accessToken) {
    return {
      redirect: {
        destination: `/auth?redirectTo=/me/stories/write/${slug}`,
        permanent: true,
      },
    };
  }

  try {
    const {
      data: { story },
    } = await axios.post<{ story: StoryType }>(
      `${process.env.API_URL}/stories`,
      {
        slug,
      },
      {
        headers: {
          // @ts-ignore
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
    // console.log("err ", err);
    return {
      notFound: true,
      // redirect: {
      //   destination: "/404",
      //   permanent: true,
      // },
    };
  }
};

export default Index;
