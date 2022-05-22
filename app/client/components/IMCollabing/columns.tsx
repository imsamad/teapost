import TPImage from '@compo/TPImage';
import { Column, CellProps } from 'react-table';
import { SliderColumnFilter } from '@compo/ReactTable/TableFilters';
import { TotalColumnSum } from '@compo/ReactTable/TotalColumnSum';
import UnCollab from './UnCollab';

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
    Header: 'UnCollab',
    accessor: '_id',
    Cell: UnCollab,
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'Published',
    accessor: 'isPublished',
    Cell: ({ value }: any) => (value ? 'True' : 'False'),
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
    Header: 'Stats',
    Footer: 'Total Stats',
    disableFilters: true,
    columns: [
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
    ],
  },
  {
    Header: 'Created At',
    accessor: 'createdAt',
    disableFilters: true,
    show: false,
  },
];

export { columns };
