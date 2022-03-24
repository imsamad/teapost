import type { AppProps } from "next/app";
import "@fontsource/nunito/200.css";
import "@fontsource/nunito/300.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "@fontsource/nunito/900.css";

import { ChakraProvider } from "@chakra-ui/react";

import Layout from "../components/Layout";
import SWR from "../components/SWR";
import { theme } from "../theme";
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
    <ChakraProvider theme={theme}>
      <SWR>
        <Layout>{getContainer(<Component {...pageProps} />)}</Layout>
      </SWR>
    </ChakraProvider>
  );
}

export default MyApp;
