import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

// // @ts-ignore
// dynamic(() => import("@fontsource/nunito/200.css"), {
//   ssr: false,
// });
// // @ts-ignore
// dynamic(() => import("@fontsource/nunito/300.css"), {
//   ssr: false,
// });
// // @ts-ignore
// dynamic(() => import("@fontsource/nunito/400.css"), {
//   ssr: false,
// });
// // @ts-ignore
// dynamic(() => import("@fontsource/nunito/500.css"), {
//   ssr: false,
// });
// // @ts-ignore
// dynamic(() => import("@fontsource/nunito/600.css"), {
//   ssr: false,
// });
// // @ts-ignore
// dynamic(() => import("@fontsource/nunito/700.css"), {
//   ssr: false,
// });
// // @ts-ignore
// dynamic(() => import("@fontsource/nunito/800.css"), {
//   ssr: false,
// });
// // @ts-ignore
// dynamic(() => import("@fontsource/nunito/900.css"), {
//   ssr: false,
// });

// import "@fontsource/nunito/100.css";
import '@fontsource/nunito/200.css';
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import '@fontsource/nunito/900.css';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/Layout';
import SWR from '../components/SWR';
import { theme } from '../theme';
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
    <>
      <Head>
        <title>Teapost</title>
      </Head>
      <ChakraProvider theme={theme}>
        <SWR>
          <Layout>{getContainer(<Component {...pageProps} />)}</Layout>
        </SWR>
      </ChakraProvider>
      <style global jsx>{`
        html::-webkit-scrollbar {
          width: 1vw;
          transition: background-color 0.3s;
        }
        html::-webkit-scrollbar-thumb {
          transition: background-color 0.3s;
          background-color: rgba(56, 105, 138, 0.6);
        }
        html::-webkit-scrollbar-track {
          transition: background-color 0.3s;
          background-color: #c7d3e5;
        }
        // html::-webkit-scrollbar-thumb:hover {
        //   background-color: rgba(7, 90, 145, 0.6);
        // }
        // html::-webkit-scrollbar-track:hover {
        //   background-color: #aed6f1;
        // }
      `}</style>
    </>
  );
}

export default MyApp;
