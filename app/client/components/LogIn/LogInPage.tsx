import { Box } from '@chakra-ui/react';

import Form from './Form';

const LogInPage = () => {
  return (
    <Box
      maxW="sm"
      mx="auto"
      border="1px"
      borderRadius="md"
      p="4"
      shadow="md"
      borderColor="gray.400"
      my="4"
    >
      <Form redirectTo="/me" />
    </Box>
  );
};

export default LogInPage;
