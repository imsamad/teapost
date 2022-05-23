import ReactTable from '@compo/ReactTable';
import ReactTableCtxProvider from '@compo/ReactTableCtxProvider';
import { getMyStoriesApi } from '@lib/api/storyApi';
import StoryType from '@lib/types/StoryType';
import { useState } from 'react';
import { TableInstance } from 'react-table';
import { columns } from './columns';
import RenderMultipleSelect from './RenderMultipleSelect';

const IMCollabing = ({ stories: storiesProp }: { stories: StoryType[] }) => {
  const [stories, setStories] = useState(storiesProp);
  const [revalidator, setRevalidator] = useState(false);
  const resetStories = async () => {
    try {
      const data = await getMyStoriesApi('iamcollabing');
      setStories(data.stories);
      setRevalidator(!revalidator);
    } catch {}
  };

  return (
    <ReactTableCtxProvider resetData={resetStories}>
      <ReactTable
        data={stories}
        columns={columns}
        revalidator={revalidator}
        renderMultipleRowSelected={(selectedRows) => (
          <RenderMultipleSelect selectedRows={selectedRows} />
        )}
      />
    </ReactTableCtxProvider>
  );
};

export default IMCollabing;
