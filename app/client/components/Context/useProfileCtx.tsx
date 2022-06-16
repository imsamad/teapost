import { createContext, useContext } from 'react';
import useSWR from 'swr';

import useAuthCtx from './useAuthCtx';
import UserType from '@lib/types/UserType';
import { GetMeType } from '@lib/types/UserType';

const ProfileCtx = createContext<{
  mutateProfile: () => void;
  myProfile: Partial<GetMeType> | undefined;
}>({ myProfile: {}, mutateProfile: () => {} });

const ProfileCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthCtx();
  const { data, mutate } = useSWR<{ myProfile: Partial<UserType> }>(
    () => auth?.user?._id && `/auth/me`
  );
  return (
    <ProfileCtx.Provider
      value={{
        myProfile: data?.myProfile,
        mutateProfile: async () => await mutate(),
      }}
    >
      {children}
    </ProfileCtx.Provider>
  );
};

const useProfile = () => useContext(ProfileCtx);
export default useProfile;

export { ProfileCtxProvider };
