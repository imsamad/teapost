import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/Layout';
import Container from '../components/Container';

function MyApp({ Component, pageProps }: AppProps) {
  /**
   * TODO
   * Make Container dynamic, with assumptions
   * 1.) default container
   * 2.) getContainer from page
   * 3.) no Container
   */

  return (
    <ChakraProvider>
      <Layout>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
