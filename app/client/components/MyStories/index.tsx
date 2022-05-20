import ReactTable from '@compo/ReactTable';
import StoryType from '@lib/types/StoryType';
import { TableInstance } from 'react-table';
import { columns } from './columns';
import MultipleRowSelected from './MultipleRowSelected';

const MyStories = ({ stories }: { stories: StoryType[] }) => {
  return (
    <>
      <ReactTable
        columns={columns}
        data={stories}
        renderMultipleRowSelected={(tableInstance: TableInstance<any>) => (
          <MultipleRowSelected tableInstance={tableInstance} />
        )}
      />
    </>
  );
};

export default MyStories;
