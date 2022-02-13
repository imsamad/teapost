import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';

import Layout from '../components/Layout';
import axios from 'axios';
function MyApp({ Component, pageProps }: AppProps) {
  /**
   * TODO
   * Make Container dynamic, with assumptions
   * 1.) default container
   * 2.) getContainer from page
   * 3.) no Container
   */
  // @ts-ignore
  const getContainer = Component?.getContainer
    ? // @ts-ignore
      Component?.getContainer
    : // @ts-ignore
      (page) => page;

  return (
    <ChakraProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            axios(resource, init).then(({ data }) => data),
        }}
      >
        <Layout>{getContainer(<Component {...pageProps} />)}</Layout>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
