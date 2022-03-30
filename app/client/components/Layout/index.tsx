import { Box, Divider, Flex, Container } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import NavBar from "../NavBar";
import Footer from "../Footer";
const Context = dynamic(() => import("../Context"), {
  ssr: false,
  // loading: () => <>Loading</>,
});
// import Context from "../Context";

type LayoutProps = {
  children: React.ReactNode;
};

const Index = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="container.xl" p="4px">
      <Context>
        <Flex
          direction="column"
          w="100%"
          minH="100vh"
          maxH="max-content"
          overflow="hidden"
        >
          <NavBar />
          <Divider my={2} />

          <Box
            flexGrow="1"
            as="main"
            minH="75vh"
            // border="1px solid red"
            // position="relative"
          >
            {children}
          </Box>
          <Footer />
        </Flex>
      </Context>
    </Container>
  );
};

export default Index;
