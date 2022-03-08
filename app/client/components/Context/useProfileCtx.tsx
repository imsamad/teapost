import { createContext, useContext } from "react";
import useSWR from "swr";

import useAuthCtx from "./useAuthCtx";

type ProfileType = {
  user: string;
  likeStories: string[];
  dislikeStories: string[];
};

const ProfileCtx = createContext<{
  mutateProfile: () => void | Promise<{ user: ProfileType }>;
  profile: Partial<ProfileType>;
}>({ profile: {}, mutateProfile: () => {} });

const ProfileCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthCtx();
  const { data, mutate }: any = useSWR<ProfileType>(
    () => user?.id && `/profile/${user?.id}`
  );
  return (
    <ProfileCtx.Provider value={{ profile: data?.user, mutateProfile: mutate }}>
      {children}
    </ProfileCtx.Provider>
  );
};

const useProfile = () => useContext(ProfileCtx);
export default useProfile;

export { ProfileCtxProvider };
