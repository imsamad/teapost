import { createContext, useContext } from "react";
import useSWR from "swr";

import profileType from "@lib/types/profileType";
import useAuthCtx from "./useAuthCtx";

const ProfileCtx = createContext<{
  mutateProfile: () => void | Promise<{ user: profileType }>;
  profile: Partial<profileType>;
}>({ profile: {}, mutateProfile: () => {} });

const ProfileCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthCtx();
  const { data, mutate }: any = useSWR<profileType>(
    () => user?._id && `/auth/me`
  );

  return (
    <ProfileCtx.Provider
      value={{
        profile: { id: user?._id, ...data?.profile },
        mutateProfile: mutate,
      }}
    >
      {children}
    </ProfileCtx.Provider>
  );
};

const useProfile = () => useContext(ProfileCtx);
export default useProfile;

export { ProfileCtxProvider };
