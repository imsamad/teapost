import { SWRConfig } from "swr";
import axios from "axios";

import { getCookies } from "@lib/cookies";

const SWRGlobal = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        // provider: function () {
        //   return new Map();
        // },
        refreshInterval: 0,
        revalidateOnFocus: false,

        fetcher: (resource, init) => {
          const endpoint =
            resource.startsWith("http") || resource.startsWith("/api")
              ? resource
              : `${process.env.NEXT_PUBLIC_API_URL}${resource}`;
          const user = getCookies();
          return axios(endpoint, {
            headers: {
              Authorization: user?.accessToken && `Bearer ${user?.accessToken}`,
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

export default SWRGlobal;
