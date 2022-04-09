import { Container, Divider, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";

import AuthorCard from "@compo/AuthorCard";
import StoryType from "@lib/types/StoryType";
import UserType from "@lib/types/UserType";
import Stories from "@compo/Stories";

const Index = ({
  stories,
  author,
}: {
  stories: StoryType[];
  author: UserType;
}) => {
  if (!author) {
    return "Skeleton";
  }
  return (
    <Container maxW="container.md" p="0" pt="4">
      <Stack spacing={4}>
        <AuthorCard author={author} displayFull={true} />

        <Divider />
        {stories?.length ? (
          <>
            <Heading size="md" textAlign="center">
              Stories
            </Heading>
            <Stories
              initialStories={stories}
              // isInitial={true}
              query={`/stories?authors=${author.username}&`}
              nextPageNo={2}
            />
          </>
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
    data: { stories, authors },
  } = await axios.get<{ stories: StoryType[]; authors: UserType[] }>(
    `${apiUrl}/stories?authors=${params.author}&nocontent=true`
  );

  return {
    props: {
      stories,
      author: authors[0],
    },
    revalidate: 10,
  };
};

export default Index;
