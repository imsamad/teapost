import { createContext, useContext } from "react";
import useSWR from "swr";

import useAuthCtx from "./useAuthCtx";
import UserType from "@lib/types/UserType";
import ProfileType from "@lib/types/ProfileType";

const ProfileCtx = createContext<{
  mutateProfile: () => void;
  myProfile: Partial<ProfileType>;
}>({ myProfile: {}, mutateProfile: () => {} });

const ProfileCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthCtx();
  const { data, mutate } = useSWR<{ user: Partial<UserType> }>(
    () => auth?.user?._id && `/auth/me`
  );

  return (
    <ProfileCtx.Provider
      value={{
        myProfile: data?.user?.profile || { _id: auth?.user?._id },
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
