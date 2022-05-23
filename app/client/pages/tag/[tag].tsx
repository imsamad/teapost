import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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

const Index = ({ stories }: { stories: StoryType[] }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <>Loading</>;
  }
  const crtTag: string = router.query.tag as string;
  const crtTagId =
    stories.length == 0
      ? ''
      : stories[0]?.tags.filter(
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

        <meta name="description" content={stories[0]?.subtitle ?? ''} />
        <meta name="keywords" content={stories[0]?.keywords ?? ''} />
        <meta name="author" content={'imsamad'} />
      </Head>

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
          <Heading textAlign="center">No stories found in this domain</Heading>
        )}
      </Stack>
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
  const stories = await Story.find({
    tags: { $in: tag._id },
    isPublished: true,
    isPublishedByAdmin: true,
    hadEmailedToFollowers: true,
  })
    .populate([
      {
        path: 'collabWith',
        select: 'username email fullName',
      },
      {
        path: 'author',
        select: 'username',
      },
      {
        path: 'tags',
      },
    ])
    .select('-content')
    .lean()
    .limit(10);
  return {
    props: {
      stories: JSON.parse(JSON.stringify(stories)),
    },
    revalidate: 10,
  };
};

export default Index;
