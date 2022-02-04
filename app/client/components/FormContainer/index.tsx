import { Box, Heading, Stack } from '@chakra-ui/react';

const Index = ({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle: string;
}) => (
  <Box
    maxW="sm"
    mx="auto"
    py="10"
    px="4"
    border="1px"
    my="4"
    borderRadius="md"
    shadow="lg"
  >
    <Stack spacing={4}>
      <Heading size="lg" textAlign="center">
        {subtitle}
      </Heading>
      {children}
    </Stack>
  </Box>
);

export default Index;
