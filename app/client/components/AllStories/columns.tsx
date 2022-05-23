import TPImage from '@compo/TPImage';
import { Column, CellProps } from 'react-table';
import { SliderColumnFilter } from '@compo/ReactTable/TableFilters';
import { TotalColumnSum } from '@compo/ReactTable/TotalColumnSum';
import PublishStories from './PublishStories';
import TruthyIcons from '@compo/TruthyIcons';
import CollabingWith from '@compo/CollabingWith';

const columns: any | Column[] = [
  {
    Header: 'TitleImage',
    accessor: 'titleImage',
    minWidth: 120,
    maxWidth: 60,
    disableFilters: true,
    disableSortBy: true,
    Cell: (props: CellProps<any>) => (
      <TPImage width="70px" height="50px" alt="TitleImage" src={props.value} />
    ),
  },
  {
    Header: 'Actions',
    accessor: 'isPublishedByAdmin',
    Cell: (props: any) => (
      <PublishStories
        storyIds={[props.cell.row.original._id]}
        showCheckBox={true}
        isPublishedByAdmin={props.value}
      />
    ),
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'Collab',
    accessor: 'collabWith',
    Cell: ({ value }: any) => <CollabingWith users={value} />,
    // disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'Author',
    accessor: 'author',
    Cell: ({ value }: any) => <>{value.username}</>,
    // disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'PublishedByAuthor',
    accessor: 'isPublished',
    Cell: ({ value }: any) => <TruthyIcons value={value} />,
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'Title',
    accessor: 'title',
    show: false,
  },
  {
    Header: 'SubTitle',
    accessor: 'subtitle',
    show: false,
  },

  {
    Header: 'Reading Time',
    accessor: 'readingTime',
    Filter: SliderColumnFilter,
    filter: 'equals',
    Footer: TotalColumnSum('readingTime'),
  },
  {
    Header: 'Views',
    accessor: 'noOfViews',
    Filter: SliderColumnFilter,
    filter: 'equals',
    Footer: TotalColumnSum('noOfViews'),
  },
  {
    Header: 'Comments',
    accessor: 'noOfComments',
    Filter: SliderColumnFilter,
    filter: 'equals',
    Footer: TotalColumnSum('noOfComments'),
  },
  {
    Header: 'Likes',
    accessor: 'noOfLikes',
    Filter: SliderColumnFilter,
    filter: 'equals',
    Footer: TotalColumnSum('noOfLikes'),
  },
  {
    Header: 'Dislikes',
    accessor: 'noOfDislikes',
    Filter: SliderColumnFilter,
    filter: 'equals',
    Footer: TotalColumnSum('noOfDislikes'),
  },

  {
    Header: 'Created At',
    accessor: 'createdAt',
    disableFilters: true,
    show: false,
  },
];

export { columns };
