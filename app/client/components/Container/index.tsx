import { Box } from '@chakra-ui/react';

const Index = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box flexGrow="1" as="main" px={[3, 6]} py="5">
      {children}
    </Box>
  );
};

export default Index;
