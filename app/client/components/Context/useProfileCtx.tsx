import { createContext, useContext } from "react";
import useSWR, { KeyedMutator } from "swr";

import ProfileType from "@lib/types/ProfileType";
import useAuthCtx from "./useAuthCtx";

const ProfileCtx = createContext<{
  mutateProfile: () => void;
  profile: Partial<ProfileType>;
}>({ profile: {}, mutateProfile: () => {} });

const ProfileCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthCtx();
  const { data, mutate } = useSWR<{ profile: Partial<ProfileType> }>(
    () => user?._id && `/auth/me`
  );

  return (
    <ProfileCtx.Provider
      value={{
        profile: data?.profile || { _id: user?._id },
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
