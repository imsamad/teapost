import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/Layout';
import '../style/old.css';
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
      <Layout>{getContainer(<Component {...pageProps} />)}</Layout>
    </ChakraProvider>
  );
}

export default MyApp;
