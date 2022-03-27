import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Author from "@compo/SingleNews/Author";
import StoryType from "@lib/types/StoryType";
import UserType from "@lib/types/UserType";
import axios from "axios";
import Stories from "@compo/Stories";
const Index = ({ stories }: { stories: StoryType[] }) => {
  return (
    <Container maxW="container.md" pt="4">
      <Stack spacing={4} border="1px">
        <Author />
        <HStack>
          <Text
            borderLeft="4px"
            borderBottom="1px"
            pl="4"
            mr="10px"
            borderColor="purple"
          >
            Stories 4
          </Text>

          <Text borderLeft="4px" borderBottom="1px" pl="4" borderColor="purple">
            Followers 4
          </Text>
        </HStack>
        <Divider />
        {stories?.length ? (
          <Stories stories={stories} />
        ) : (
          <Heading textAlign="center">No stories found</Heading>
        )}
      </Stack>
    </Container>
  );
};

const apiUrl = process.env.API_URL!;

export const getStaticPaths = async () => {
  const {
    data: { users },
  } = await axios.get<{ users: UserType[] }>(`${apiUrl}/users`);

  const paths = users.map((user) => ({
    params: { author: user.username },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: any) => {
  const {
    data: { stories },
  } = await axios.get<{ stories: StoryType[] }>(
    `${apiUrl}/stories/author/${params.author}`
  );

  return {
    props: {
      stories,
    },
    revalidate: 10,
  };
};

export default Index;
