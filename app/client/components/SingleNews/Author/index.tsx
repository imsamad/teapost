import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
import TSButton from "@compo/UI/TSButton";
import React from "react";

const Index = () => {
  return (
    <Flex>
      <Avatar
        size="xl"
        name="Segun Adebayo"
        src="https://bit.ly/sage-adebayo"
      />
      <Box border="0px" pl="8">
        <HStack>
          <Text size="xl" fontWeight={700}>
            Shalitha Suranga
          </Text>
          <TSButton
            colorScheme="purple"
            variant="outline"
            borderRadius="lg"
            size="sm"
          >
            Follow
          </TSButton>
        </HStack>
        <Text fontSize="md" fontWeight={300}>
          Programmer | Author of Neutralino.js | Technical Writer
        </Text>
      </Box>
    </Flex>
  );
};

export default Index;
