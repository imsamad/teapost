import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  /**
   * TODO
   * Make Container dynamic, with assumptions
   * 1.) default container
   * 2.) getContainer from page
   * 3.) no Container
   */

  const getContainer = Component?.getContainer
    ? Component?.getContainer
    : (page) => page;

  return (
    <ChakraProvider>
      <Layout>{getContainer(<Component {...pageProps} />)}</Layout>
    </ChakraProvider>
  );
}

export default MyApp;
