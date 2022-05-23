import { SliderColumnFilter } from '@compo/ReactTable/TableFilters';
import { TotalColumnSum } from '@compo/ReactTable/TotalColumnSum';
import TPImage from '@compo/TPImage';
import TruthyIcons from '@compo/TruthyIcons';
import { CellProps } from 'react-table';
import BlockUsers from './BlockUser';

const columns: any = [
  {
    Header: 'Profile',
    accessor: 'profilePic',
    disableFilters: true,
    disableSortBy: true,
    Cell: (props: CellProps<any>) => (
      <TPImage width="70px" height="50px" alt="TitleImage" src={props.value} />
    ),
  },
  {
    Header: 'Block',
    accessor: 'isAuthorised',
    Cell: (props: any) => (
      <BlockUsers
        userIds={[props.cell.row.original._id]}
        showCheckBox={true}
        isAuthorised={props.value}
      />
    ),
    disableSortBy: true,
    disableFilters: true,
  },
  {
    Header: 'Name',
    accessor: 'fullName',
  },
  {
    Header: 'Username',
    accessor: 'username',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Role',
    accessor: 'role',
  },
  {
    Header: 'TagLines',
    accessor: 'tagLines',
    show: false,
  },
  {
    Header: 'Email Verified',
    accessor: 'isEmailVerified',
    Cell: ({ value }: any) => <TruthyIcons value={value} />,
    disableSortBy: true,
    disableFilters: true,
  },

  {
    Header: 'Stories',
    accessor: 'stories',
    Filter: SliderColumnFilter,
    filter: 'equals',
    Footer: TotalColumnSum('stories'),
  },
  {
    Header: 'Following',
    accessor: 'following',
    Filter: SliderColumnFilter,
    filter: 'equals',
    Footer: TotalColumnSum('following'),
  },
  {
    Header: 'Followers',
    accessor: 'followers',
    Filter: SliderColumnFilter,
    filter: 'equals',
    Footer: TotalColumnSum('followers'),
  },

  {
    Header: 'Created At',
    accessor: 'createdAt',
    disableFilters: true,
    show: false,
  },
];

export { columns };
