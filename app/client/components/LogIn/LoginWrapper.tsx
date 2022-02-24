import { Box, Heading, Stack } from '@chakra-ui/react';

const Index = ({ children }: { children: React.ReactNode }) => (
  <Stack
    maxW="sm"
    spacing={4}
    mx="auto"
    py="10"
    px="4"
    border="1px"
    my="4"
    borderRadius="md"
    shadow="md"
  >
    {children}
  </Stack>
);

export default Index;
