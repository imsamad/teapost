import { Box, Divider, Flex, ChakraProvider } from '@chakra-ui/react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Context from '../Context';

type LayoutProps = {
  children: React.ReactNode;
};

import SWR from '../SWR';
import { theme } from '../../theme';

const Index = ({ children }: LayoutProps) => {
  return (
    <ChakraProvider theme={theme}>
      <SWR>
        <Context>
          <Flex direction="column" maxW="100vw" minH="100vh" overflow="hidden">
            <NavBar />
            <Divider />

            <Box flexGrow="1" as="main">
              {children}
            </Box>
            <Footer />
          </Flex>
        </Context>
      </SWR>
    </ChakraProvider>
  );
};

export default Index;
