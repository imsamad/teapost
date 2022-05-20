import ReactTable from '@compo/ReactTable';
import { getMyStoriesApi } from '@lib/api/storyApi';
import StoryType from '@lib/types/StoryType';
import { useState } from 'react';
import { TableInstance } from 'react-table';
import { columns } from './columns';
import MultipleRowSelected from './MultipleRowSelected';

const MyStories = ({ stories: storiesProp }: { stories: StoryType[] }) => {
  const [stories, setStories] = useState(storiesProp);

  const resetStories = () => {
    getMyStoriesApi()
      .then((data) => {
        setStories(data.stories);
      })
      .catch(() => {});
  };

  return (
    <>
      <ReactTable
        columns={columns}
        data={stories}
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
