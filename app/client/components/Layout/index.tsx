import { Box, Divider, Flex } from '@chakra-ui/react';

import Header from '../Header';
import Footer from '../Footer';
import Category from '../Category';
type LayoutProps = {
  children: React.ReactNode;
};

const Index = ({ children }: LayoutProps) => {
  return (
    <Flex direction="column" maxW="100vw" minH="100vh" overflow="hidden">
      <Box maxW="100%">
        <Header />
        <Divider />
        <Category />
        <Divider />
      </Box>
      {children}
      <Box maxW="100%">
        <Footer />
      </Box>
    </Flex>
  );
};

export default Index;
