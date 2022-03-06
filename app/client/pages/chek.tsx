import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import useAuthCtx from "../components/Context/useAuthCtx";

const Index = () => {
  const { count, setCount } = useAuthCtx();
  return (
    <Box maxW="400px" mx="auto " p="16px">
      <Heading>{count}</Heading>
      <Button
        onClick={() =>
          // @ts-ignore
          setCount(count + 1)
        }
      >
        Up
      </Button>
    </Box>
  );
};

export default Index;
