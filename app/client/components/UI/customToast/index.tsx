import { Button, Heading, HStack } from '@chakra-ui/react';

// eslint-disable-next-line react/display-name
const CustomToast = (onClick: any) => () => {
  return (
    <HStack
      bgColor="gray.300"
      border="1px solid #ddd"
      p="8px"
      borderRadius="md"
      justifyContent="space-between"
    >
      <Heading
        fontSize="sm"
        _dark={{
          color: 'black',
        }}
      >
        You are not logged in.
      </Heading>
      <Button size="sm" color="white" p={3} bg="blue.500" onClick={onClick}>
        Login
      </Button>
    </HStack>
  );
};
export default CustomToast;
