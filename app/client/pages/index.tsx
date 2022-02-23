import HomePage from '../components/HomePage';
import axios from 'axios';
const singleStory = {
  author: {
    username: 'imsamad',
    email: 'user1@gmail.com',
    id: '621261930708dca6ab0f4039',
  },
  slug: '2xct4konvjvbonaxf',
  __v: 0,
  createdAt: '2022-02-20T15:43:35.605Z',
  isPublished: true,
  tags: [
    {
      tag: 'history',
      id: '621266ae1f42a49d12290575',
    },
    {
      tag: 'personality',
      id: '6213baaf9eea19233fd1b621',
    },
  ],
  updatedAt: '2022-02-23T12:24:27.783Z',
  subtitle:
    'Take it from a German: Teaching students the unadorned truth of the past will lead them on a path of true respect and love for their country',
  title: 'Why Banning Dark Periods Of History From Schools Is Unpatriotic',
  keywords: 'abcdefghijklmnopqlmnopqrst',
  titleImage:
    'http://res.cloudinary.com/dnkb5aetl/image/upload/v1645618915/f9vgpm9o8y717ewdnvud.jpg',
  id: '621261a7867845e516a158c5',
};
const Index = ({ stories = [singleStory] }: any) => {
  return (
    <>
      <HomePage stories={stories} />
    </>
  );
};

type storyType = {
  id: string;
  title: string;
  subtitile: string;
  author: {
    name: string;
    id: string;
  };
  slug: string;
};

// export const getStaticProps = async () => {
//   const {
//     data: { stories },
//   } = await axios(`${process.env.API_URL}/story`);

//   return {
//     props: {
//       stories,
//     },
//   };
// };

export default Index;
