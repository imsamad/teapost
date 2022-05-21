import { Button, Heading, HStack } from '@chakra-ui/react';
import MyLink from '@compo/MyLink';
import ReactTable from '@compo/ReactTable';
import { getMyStoriesApi } from '@lib/api/storyApi';
import StoryType from '@lib/types/StoryType';
import { nanoid } from 'nanoid';
import { useCallback, useState } from 'react';
import { FaPenNib } from 'react-icons/fa';
import { TableInstance } from 'react-table';
import { columns } from './columns';
import MultipleRowSelected from './MultipleRowSelected';

const MyStories = ({ stories: storiesProp }: { stories: StoryType[] }) => {
  const [stories, setStories] = useState(storiesProp);
  const [revalidator, setRevalidator] = useState(false);
  const resetStories = () => {
    getMyStoriesApi()
      .then((data) => {
        setStories(data.stories);
        setRevalidator(!revalidator);
      })
      .catch(() => {});
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
    <>
      <ReactTable
        columns={columns}
        data={stories}
        revalidator={revalidator}
        renderMultipleRowSelected={(tableInstance: TableInstance<any>) => (
          <MultipleRowSelected
            tableInstance={tableInstance}
            resetStories={resetStories}
          />
        )}
      />
    </>
  );
};

export default MyStories;
