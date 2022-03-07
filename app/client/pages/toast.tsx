import {
  Box,
  Text,
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  useToast,
  HStack,
  Heading,
} from "@chakra-ui/react";

const Index = () => {
  const toast = useToast();
  return (
    <Box maxW="400px" mx="auto">
      <Button
        onClick={() => {
          toast({
            duration: 2000,
            isClosable: true,
            render: () => (
              <HStack
                bgColor="gray.300"
                border="1px solid #ddd"
                p="8px"
                borderRadius="md"
                justifyContent="space-between"
              >
                <Heading fontSize="sm">You not ogged in.</Heading>
                <Button size="sm" color="white" p={3} bg="blue.500">
                  Login
                </Button>
              </HStack>
            ),
          });
        }}
      >
        Toast
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>You are not Logged In</PopoverHeader>
          <PopoverFooter d="flex" alignItems="center" justifyContent="flex-end">
            <Button size="sm" colorScheme="green">
              Log In
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <Button>Open</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>You are not Logged In</PopoverHeader>
          <PopoverFooter d="flex" alignItems="center" justifyContent="flex-end">
            <Button size="sm" colorScheme="green">
              Log In
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default Index;
