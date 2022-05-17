import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import '@fontsource/nunito/200.css';
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/900.css';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isOnMePage = router.pathname.startsWith('/me');
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
    : (page: any) => (
        <Container
          maxWidth={isOnMePage ? 'container.xl' : 'container.md'}
          p={1}
        >
          {page}
        </Container>
      );

  return (
    <>
      <Head>
        <title>Teapost</title>
      </Head>
      <Layout>{getContainer(<Component {...pageProps} />)}</Layout>

      <style global jsx>{`
        ::-webkit-scrollbar {
          width: 1vw;
          transition: background-color 0.3s;
        }
        ::-webkit-scrollbar-thumb {
          transition: background-color 0.3s;
          background-color: rgba(56, 105, 138, 0.6);
        }
        ::-webkit-scrollbar-track {
          transition: background-color 0.3s;
          background-color: #c7d3e5;
        }
      `}</style>
    </>
  );
}

export default MyApp;
