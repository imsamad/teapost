import StoryType from '@lib/types/StoryType';
import SingleStory from '@compo/SingleNews';
import UserType from '@lib/types/UserType';
import Story from '@lib/models/Story';
import Tag from '@lib/models/Tag';
import dbConnect from '@lib/dbConnect';
import { peelUserDoc } from '@lib/models/User';
import Head from 'next/head';

const Index = ({ story, author }: { story: StoryType; author: UserType }) => {
  if (!story) {
    return 'Loading...';
  }
  return (
    <>
      <Head>
        <title>{story.title} | Teapost</title>
      </Head>
      <SingleStory story={story} author={author} />
    </>
  );
};

const apiUrl = process.env.API_URL!;

export const getStaticPaths = async () => {
  await dbConnect();
  const stories = await Story.find({}).lean();

  const paths = stories.map((story: any) => ({
    params: { slug: story.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }: any) => {
  await dbConnect();
  await Tag.find({}).limit(1);
  const story = await Story.findOne({
    slug: params.slug,
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
    .lean();
  if (!story) {
    return {
      notFound: true,
      revalidate: 10,
    };
    throw new Error(`Failed to fetch posts, received status `);
  }
  let parsedStory = JSON.parse(JSON.stringify(story));

  return {
    props: {
      story: parsedStory,
      author: parsedStory.author,
    },
    revalidate: 10,
  };
};

export default Index;
