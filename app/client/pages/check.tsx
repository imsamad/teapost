import { Box, Heading } from "@chakra-ui/react";
import React from "react";
const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const check = () => {
  return (
    <Box
      border="1px"
      h="100%"
      mx="auto"
      w="100%"
      // position="relative"
      // top="0"
      // left="0"
      // right={0}
      // bottom={0}
    >
      {fontWeights.map((w) => (
        <Heading key={w} fontWeight={w} size="md" my="2px">
          Lorem Ipsum{w}
        </Heading>
      ))}
      <Box />
    </Box>
  );
};

export default check;
