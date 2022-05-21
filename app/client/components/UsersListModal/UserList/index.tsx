import { Box, HStack, Spinner } from '@chakra-ui/react';
import useInfinite from '@compo/Hooks/useInfinite';
import UserType from '@lib/types/UserType';

import useSWR from 'swr';
import User from './User';

const UserList = ({
  crtPageNo,
  initialUsers,
  onClickCB,
  checkedUsers,
  onlyShowUsers,
}: {
  crtPageNo: number;
  initialUsers?: UserType[];
  checkedUsers: string[];
  onClickCB?: (userId: string, isChecked: boolean) => Promise<boolean>;
  onlyShowUsers?: UserType[];
}) => {
  const { data, isValidating } = useSWR<{
    users: UserType[];
    pagination: { next: number; prev: number; limit: number };
  }>(() => crtPageNo && `/users?page=${crtPageNo}`);
  const { isInViewRef, show } = useInfinite({
    ignore: !crtPageNo,
  });
  return (
    <Box>
      {onlyShowUsers ? (
        onlyShowUsers?.map((user) => (
          <User
            key={user._id}
            user={user}
            isChecked={checkedUsers?.includes(user._id) ?? false}
            onClickCB={onClickCB}
          />
        ))
      ) : (
        <>
          <div ref={initialUsers || !crtPageNo ? null : isInViewRef} />
          {initialUsers ? (
            <>
              {initialUsers?.map((user) => (
                <User
                  key={user._id}
                  user={user}
                  isChecked={checkedUsers?.includes(user._id) ?? false}
                  onClickCB={onClickCB}
                />
              ))}
              <UserList
                crtPageNo={2}
                onClickCB={onClickCB}
                checkedUsers={checkedUsers}
              />
            </>
          ) : show && !isValidating && data ? (
            <>
              {data?.users.map((user) => (
                <User
                  key={user._id}
                  user={user}
                  isChecked={checkedUsers?.includes(user._id) ?? false}
                  onClickCB={onClickCB}
                />
              ))}
              {data.pagination.next && (
                <UserList
                  crtPageNo={data.pagination.next}
                  onClickCB={onClickCB}
                  checkedUsers={checkedUsers}
                />
              )}
            </>
          ) : (!isValidating && data && !show) || (isValidating && show) ? (
            <Loader />
          ) : (
            ''
          )}
        </>
      )}
    </Box>
  );
};

export default UserList;
const Loader = () => (
  <HStack justifyContent="center" my={2}>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="sm"
    />
  </HStack>
);
