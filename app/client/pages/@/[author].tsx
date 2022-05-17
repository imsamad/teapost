import { Divider, Heading, Stack } from '@chakra-ui/react';

import AuthorCard from '@compo/AuthorCard';
import StoryType from '@lib/types/StoryType';
import UserType from '@lib/types/UserType';
import Stories from '@compo/Stories';
import dbConnect from '@lib/dbConnect';
import User, { peelUserDoc } from '@lib/models/User';
import Story from '@lib/models/Story';
import Head from 'next/head';
import Tag from '@lib/models/Tag';

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

  await Tag.find({}).limit(1);
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
      author: JSON.parse(JSON.stringify(peelUserDoc(author))),
    },
    revalidate: 10,
  };
};

export default Index;
