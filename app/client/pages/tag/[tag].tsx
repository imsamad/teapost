import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Divider,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Link from 'next/link';

import StoryType from '@lib/types/StoryType';
import Stories from '@compo/Stories';
import Head from 'next/head';
import dbConnect from '@lib/dbConnect';
import Tag from '@lib/models/Tag';
import Story from '@lib/models/Story';
import { peelUserDoc } from '@lib/models/User';

const Index = ({ stories }: { stories: StoryType[] }) => {
  const router = useRouter();
  const crtTag: string = router.query.tag as string;

  const crtTagId = stories[0].tags.filter(
    (tag) => tag.title.toLowerCase() == crtTag.toLowerCase()
  )[0]._id;

  return (
    <>
      <Head>
        <title>
          {crtTag
            .split('')
            .map((v, i) => (i == 0 ? v.toUpperCase() : v))
            .join('')}
          | Teapost
        </title>
      </Head>
      <Container maxW="container.md" p="0" pt="4">
        <Stack spacing={4}>
          <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink isCurrentPage>{crtTag}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Divider />
          {stories?.length ? (
            <>
              <Heading size="md" textAlign="center">
                Stories
              </Heading>
              <Stories
                initialStories={stories}
                nextPageNo={2}
                query={`/stories?tags=${crtTagId}&`}
              />
            </>
          ) : (
            <Heading textAlign="center">
              No stories found in this domain
            </Heading>
          )}
        </Stack>
      </Container>
    </>
  );
};

export const getStaticPaths = async () => {
  await dbConnect();

  const tags = await Tag.find({});

  const paths = tags.map((tag) => ({
    params: { tag: tag.title },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: any) => {
  await dbConnect();
  const tag = await Tag.findOne({ title: params.tag });
  if (!tag) {
    return {
      props: {
        stories: [],
      },
      revalidate: 10,
    };
  }
  const result = await Story.find({
    tags: { $in: tag._id },
    isPublished: true,
    isPublishedByAdmin: true,
    hadEmailedToFollowers: true,
  })
    .populate([
      {
        path: 'collabWith',
        transform: (v: any) => peelUserDoc(v),
      },
      {
        path: 'author',
        transform: (v: any) => peelUserDoc(v),
      },
      {
        path: 'tags',
      },
    ])
    .lean()
    .limit(10);

  return {
    props: {
      stories: JSON.parse(JSON.stringify(result)),
    },
    revalidate: 10,
  };
};

export default Index;
