import { createContext, useContext } from "react";
import useSWR from "swr";

import ProfileType from "@lib/types/ProfileType";
import useAuthCtx from "./useAuthCtx";

const ProfileCtx = createContext<{
  mutateProfile: () => void | Promise<{ user: ProfileType }>;
  profile: Partial<ProfileType>;
}>({ profile: {}, mutateProfile: () => {} });

const ProfileCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthCtx();
  const { data, mutate }: any = useSWR<ProfileType>(
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
