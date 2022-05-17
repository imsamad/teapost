import { Box } from '@chakra-ui/react';

const index = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      border="1px"
      borderColor="#ddd"
      borderTopRadius="xl"
      px={[2, 5]}
      py={4}
      my={2}
      shadow="md"
    >
      {children}
    </Box>
  );
};

export default index;
