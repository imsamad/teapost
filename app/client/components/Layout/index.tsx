import { Box, Divider, Flex, Container } from "@chakra-ui/react";

import NavBar from "../NavBar";
import Footer from "../Footer";
import Context from "../Context";

type LayoutProps = {
  children: React.ReactNode;
};

const Index = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="container.xl">
      <Context>
        <Flex direction="column" w="100%" minH="100vh" overflow="hidden">
          <NavBar />
          <Divider my="2" />

          <Box flexGrow="1" as="main">
            {children}
          </Box>
          <Footer />
        </Flex>
      </Context>
    </Container>
  );
};

export default Index;
