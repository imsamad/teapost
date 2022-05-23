import { Button, Heading, HStack, useDisclosure } from '@chakra-ui/react';
import MyLink from '@compo/MyLink';
import ReactTable from '@compo/ReactTable';
import ReactTableCtxProvider from '@compo/ReactTableCtxProvider';
import { getMyStoriesApi } from '@lib/api/storyApi';
import StoryType from '@lib/types/StoryType';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { FaPenNib } from 'react-icons/fa';
import { columns } from './columns';
import MultipleRowSelected from './MultipleRowSelected';

const MyStories = ({ stories: storiesProp }: { stories: StoryType[] }) => {
  const [stories, setStories] = useState(storiesProp);
  const revalidator = useDisclosure();

  const resetStories = async () => {
    try {
      const data = await getMyStoriesApi('my');
      setStories(data.stories);
      revalidator.onToggle();
    } catch {}
  };

  if (!stories.length) {
    return (
      <HStack justifyContent="center">
        <Heading size="md" textAlign="center">
          No Stories Exist
        </Heading>
        <MyLink href={`/me/stories/write/${nanoid(10)}`}>
          <Button rightIcon={<FaPenNib />} color="green.600" size="lg">
            Write a new one
          </Button>
        </MyLink>
      </HStack>
    );
  }
  return (
    <ReactTableCtxProvider resetData={resetStories}>
      <ReactTable
        columns={columns}
        data={stories}
        revalidator={revalidator.isOpen}
        renderMultipleRowSelected={(selectedRow) => (
          <MultipleRowSelected selectedRow={selectedRow} />
        )}
      />
    </ReactTableCtxProvider>
  );
};

export default MyStories;
