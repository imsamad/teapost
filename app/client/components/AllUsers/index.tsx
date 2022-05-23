import { useDisclosure } from '@chakra-ui/react';
import ReactTable from '@compo/ReactTable';
import ReactTableCtxProvider from '@compo/ReactTableCtxProvider';
import { giveMeDataAdminApi } from '@lib/api/adminApi';
import UserType from '@lib/types/UserType';
import { useState } from 'react';
import BlockUsers from './BlockUser';
import { columns } from './columns';
const AllUsers = ({ users: usersProp }: { users: UserType[] }) => {
  const [users, setUsers] = useState(usersProp);
  const revalidator = useDisclosure();

  const resetData = async () => {
    try {
      const { users: newUsers } = await giveMeDataAdminApi('users');
      // console.log('newUsers ', newUsers);
      setUsers(newUsers);
      revalidator.onToggle();
    } catch {
    } finally {
    }
  };

  return (
    <ReactTableCtxProvider resetData={resetData}>
      <ReactTable
        data={users}
        columns={columns}
        revalidator={revalidator.isOpen}
        renderMultipleRowSelected={(selectedFlatRows) => (
          <BlockUsers
            showCheckBox={false}
            // @ts-ignore
            userIds={selectedFlatRows.map((d: any) => d.original._id)}
          />
        )}
      />
    </ReactTableCtxProvider>
  );
};

export default AllUsers;
