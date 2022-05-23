import { useDisclosure } from '@chakra-ui/react';
import ReactTable from '@compo/ReactTable';
import ReactTableCtxProvider from '@compo/ReactTableCtxProvider';
import { giveMeDataAdminApi } from '@lib/api/adminApi';
import StoryType from '@lib/types/StoryType';
import { useState } from 'react';
import { columns } from './columns';
import PublishStories from './PublishStories';

const AllStories = ({ stories: storiesProp }: { stories: StoryType[] }) => {
  const [stories, setStories] = useState(storiesProp);
  const revalidator = useDisclosure();

  const resetData = async () => {
    try {
      const { stories: newStories } = await giveMeDataAdminApi('stories');
      // console.log('newUsers ', newUsers);
      setStories(newStories);
      revalidator.onToggle();
    } catch {
    } finally {
    }
  };
  return (
    <ReactTableCtxProvider resetData={resetData}>
      <ReactTable
        data={stories}
        columns={columns}
        revalidator={revalidator.isOpen}
        renderMultipleRowSelected={(selectedFlatRows) => (
          <PublishStories
            showCheckBox={false}
            // @ts-ignore
            storyIds={selectedFlatRows.map((d: any) => d.original._id)}
          />
        )}
      />
    </ReactTableCtxProvider>
  );
};

export default AllStories;
