import { createContext, useContext } from "react";
import useSWR from "swr";

import useAuthCtx from "./useAuthCtx";

type ProfileType = {
  id: string;
  likedStories: string[];
  dislikedStories: string[];
  following: string[];
  storyCollections: { _id: string; title: string; stories: string[] }[];
};

const ProfileCtx = createContext<{
  mutateProfile: () => void | Promise<{ user: ProfileType }>;
  profile: Partial<ProfileType>;
}>({ profile: {}, mutateProfile: () => {} });

const ProfileCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthCtx();
  const { data, mutate }: any = useSWR<ProfileType>(
    () => user?.id && `/auth/me`
  );
  return (
    <ProfileCtx.Provider
      value={{
        profile: { id: user?.id, ...data?.profile },
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
