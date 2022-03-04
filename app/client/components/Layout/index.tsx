import { Box, Divider, Flex, Container } from '@chakra-ui/react';

import NavBar from '../NavBar';
import Footer from '../Footer';
import { AuthCtxProvider } from '../Context/useAuthCtx';
import { UICtxProvider } from '../Context/useUICtx';

type LayoutProps = {
  children: React.ReactNode;
};

const Index = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="container.xl">
      <AuthCtxProvider>
        <UICtxProvider>
          <Flex direction="column" w="100%" minH="100vh" overflow="hidden">
            <NavBar />
            <Divider />

            <Box flexGrow="1" as="main">
              {children}
            </Box>
            <Footer />
          </Flex>
        </UICtxProvider>
      </AuthCtxProvider>
    </Container>
  );
};

export default Index;
