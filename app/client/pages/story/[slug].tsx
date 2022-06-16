import StoryType from '@lib/types/StoryType';
import SingleStory from '@compo/SingleStory';
import UserType from '@lib/types/UserType';
import Story from '@lib/models/Story';
import dbConnect from '@lib/dbConnect';
import Head from 'next/head';
import { User } from '@lib/models';

const Index = ({ story, author }: { story: StoryType; author: UserType }) => {
  if (!story) {
    return 'Loading...';
  }
  return (
    <>
      <Head>
        <title>{story.title} | Teapost</title>
        <meta name="description" content={story.subtitle} />
        <meta name="keywords" content={story.keywords} />
        <meta name="author" content={story.author.username} />
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
  const story = await Story.findOne({
    slug: params.slug,
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
