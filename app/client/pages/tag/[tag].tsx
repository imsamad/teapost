import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Divider,
  Heading,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";

import StoryType from "@lib/types/StoryType";
import Stories from "@compo/Stories";
import TagType from "@lib/types/TagType";

const Index = ({ stories }: { stories: StoryType[] }) => {
  const router = useRouter();
  return (
    <Container maxW="container.md" p="0" pt="4">
      <Stack spacing={4}>
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink isCurrentPage>{router.query.tag}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Divider />
        {stories?.length ? (
          <>
            <Heading size="md" textAlign="center">
              Stories
            </Heading>
            <Stories
              stories={stories}
              nextPageNo={2}
              query={`tags=${router.query.tag}`}
              isInitial={true}
            />
          </>
        ) : (
          <Heading textAlign="center">No stories found in this domain</Heading>
        )}
      </Stack>
    </Container>
  );
};

const apiUrl = process.env.API_URL!;

export const getStaticPaths = async () => {
  const {
    data: { tags },
  } = await axios.get<{ tags: TagType[] }>(`${apiUrl}/tags`);

  const paths = tags.map((tag) => ({
    params: { tag: tag.title },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: any) => {
  const {
    data: { stories },
  } = await axios.get<{ stories: StoryType[] }>(
    `${apiUrl}/stories?tags=${params.tag}`
  );

  return {
    props: {
      stories,
    },
    revalidate: 10,
  };
};

export default Index;
