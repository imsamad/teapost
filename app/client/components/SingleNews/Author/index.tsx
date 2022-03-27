import { Avatar, Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
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
        <HStack mb="2">
          <Stack justifyContent="center">
            <Text size="xl" fontWeight={700} lineHeight={1}>
              Shalitha Suranga
            </Text>
            <Text
              m="0"
              p="0"
              border="0px solid red"
              lineHeight={1}
              fontStyle="italic"
            >
              @username
            </Text>
          </Stack>
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
