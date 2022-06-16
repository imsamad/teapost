import { Divider, Heading, Stack } from '@chakra-ui/react';

import AuthorCard from '@compo/AuthorCard';
import StoryType from '@lib/types/StoryType';
import UserType from '@lib/types/UserType';
import Stories from '@compo/Stories';
import dbConnect from '@lib/dbConnect';
import User from '@lib/models/User';
import Story from '@lib/models/Story';
import Head from 'next/head';

const Index = ({
  stories,
  author,
}: {
  stories: StoryType[];
  author: UserType;
}) => {
  if (!author) {
    return 'Skeleton';
  }
  return (
    <>
      <Head>
        <title>{author.fullName} | Teapost</title>

        <meta name="description" content={stories[0]?.subtitle ?? ''} />
        <meta name="keywords" content={stories[0]?.keywords ?? ''} />
        <meta name="author" content={author.username} />
      </Head>

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
              query={`/stories?authors=${author._id}&`}
              nextPageNo={2}
            />
          </>
        ) : (
          <Heading textAlign="center">No stories found</Heading>
        )}
      </Stack>
    </>
  );
};

const apiUrl = process.env.API_URL!;

export const getStaticPaths = async () => {
  await dbConnect();
  const users = await User.find({}).lean();

  const paths = users.map((user) => ({
    params: { author: user.username },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: any) => {
  await dbConnect();

  const author = await User.findOne({ username: params.author }).lean();

  if (!author) {
    return {
      props: {
        stories: [],
      },
      revalidate: 10,
    };
  }

  const result = await Story.find({
    author: author._id,
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
        select: 'username email fullName',
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
      author: JSON.parse(JSON.stringify(author)),
    },
    revalidate: 10,
  };
};

export default Index;
