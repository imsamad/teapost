import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import Author from "@compo/SingleNews/Author";
import StoryType from "@lib/types/StoryType";

import axios from "axios";
import Stories from "@compo/Stories";
import TagType from "@lib/types/TagType";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { BiHomeHeart } from "react-icons/bi";
import Link from "next/link";

const Index = ({ stories }: { stories: StoryType[] }) => {
  const router = useRouter();
  return (
    <Container maxW="container.md" p="0" pt="4">
      <Stack spacing={4}>
        <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">
              Home
              {/* <Icon as={BiHomeHeart} /> */}
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
            <Stories stories={stories} />
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
