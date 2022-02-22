import { Box, Circle, Text } from '@chakra-ui/react';
import React from 'react';

const font = () => {
  return (
    <Box p={80}>
      <Box h="32px" border="1px solid black">
        <Circle size="20px" bgColor="pink">
          <Text fontSize="10px" lineHeight="10px">
            H
          </Text>
        </Circle>
      </Box>
    </Box>
  );
};

export default font;
