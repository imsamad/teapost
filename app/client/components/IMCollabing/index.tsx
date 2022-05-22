import ReactTable from '@compo/ReactTable';
import { getMyStoriesApi } from '@lib/api/storyApi';
import StoryType from '@lib/types/StoryType';
import { createContext, useContext, useState } from 'react';
import { TableInstance } from 'react-table';
import { columns } from './columns';
import RenderMultipleSelect from './RenderMultipleSelect';

const ImCollabingCtx = createContext<{ resetStories: () => Promise<any> }>({
  resetStories: async () => {},
});

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
    <ImCollabingCtx.Provider value={{ resetStories }}>
      <ReactTable
        data={stories}
        columns={columns}
        revalidator={revalidator}
        renderMultipleRowSelected={(tableInstance: TableInstance<any>) => (
          <RenderMultipleSelect
            tableInstance={tableInstance}
            resetStories={resetStories}
          />
        )}
      />
    </ImCollabingCtx.Provider>
  );
};

export const useStories = () => useContext(ImCollabingCtx);

export default IMCollabing;
