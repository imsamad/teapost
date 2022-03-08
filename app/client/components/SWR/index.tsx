import { SWRConfig } from "swr";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { getCookies } from "../../lib/getUserFromCookie";

const SWRTokenCtx = createContext<{ INFORM_COOKIE_CHANGE: () => void }>({
  INFORM_COOKIE_CHANGE: () => {},
});

const SWRGlobal = ({ children }: { children: React.ReactNode }) => {
  const [IS_COOKIE_CHANGED, setIsCookieChanged] = useState<boolean>(true);
  const [{ user, refreshToken }, setUser] = useState<any>(getCookies());

  const INFORM_COOKIE_CHANGE = () => {
    setIsCookieChanged(!IS_COOKIE_CHANGED);
  };

  useEffect(() => {
    setUser(getCookies());
  }, [IS_COOKIE_CHANGED]);

  return (
    <SWRConfig
      value={{
        refreshInterval: 0 * 1000,
        fetcher: (resource, init) => {
          const endpoint =
            resource.startsWith("http") || resource.startsWith("/api")
              ? resource
              : `${process.env.NEXT_PUBLIC_API_URL}${resource}`;

          return axios(endpoint, {
            headers: {
              Authorization: user?.accessToken && `Bearer ${user?.accessToken}`,
              "x-ref-token": refreshToken && refreshToken,
            },
            ...init,
          }).then(({ data }) => data);
        },
      }}
    >
      <SWRTokenCtx.Provider value={{ INFORM_COOKIE_CHANGE }}>
        {children}
      </SWRTokenCtx.Provider>
    </SWRConfig>
  );
};

const USE_INFORM_COOKIE_CHANGE = () => useContext(SWRTokenCtx);
export { USE_INFORM_COOKIE_CHANGE };

export default SWRGlobal;
