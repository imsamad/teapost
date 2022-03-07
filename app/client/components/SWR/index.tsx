import { SWRConfig } from "swr";
import axios from "axios";

import { useAuthCtx } from "../Context";

const Index = ({ children }: { children: React.ReactNode }) => {
  const {
    user: { accessToken, refreshToken },
  } = useAuthCtx();
  return (
    <SWRConfig
      value={{
        refreshInterval: 6 * 1000,
        fetcher: (resource, init) => {
          const enpoint =
            resource.startsWith("http") || resource.startsWith("/api")
              ? resource
              : `${process.env.NEXT_PUBLIC_API_URL}${resource}`;

          return axios(enpoint, {
            headers: {
              Authorization: accessToken && `Bearer ${accessToken}`,
              "x-ref-token": refreshToken && refreshToken,
            },
            ...init,
          }).then(({ data }) => data);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default Index;
