import { Box, Divider, Flex, Container } from '@chakra-ui/react';

import NavBar from '../NavBar';
import Footer from '../Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Index = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="container.xl">
      <Flex direction="column" maxW="100vw" minH="100vh" overflow="hidden">
        <NavBar />
        <Divider />

        <Box flexGrow="1" as="main">
          {children}
        </Box>
        <Footer />
      </Flex>
    </Container>
  );
};

export default Index;
