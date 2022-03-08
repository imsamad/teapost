import { createContext, useContext } from "react";
import useSWR from "swr";

import useAuthCtx from "./useAuthCtx";
type ProfileType = {
  user: string;
  likeStories: string[];
  dislikeStories: string[];
};

const ProfileCtx = createContext<{
  profile: Partial<ProfileType>;
}>({ profile: {} });

const ProfileCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthCtx();
  const swrData = useSWR<ProfileType>(() => user?.id && `/profile/${user?.id}`);

  const { data: profile = {} } = swrData;
  return (
    <ProfileCtx.Provider value={{ profile }}>{children}</ProfileCtx.Provider>
  );
};

const useProfile = () => useContext(ProfileCtx);
export default useProfile;

export { ProfileCtxProvider };
