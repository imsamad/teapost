import { Stack } from "@chakra-ui/react";

const StoryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      my={4}
      px="10px"
      py="8px"
      shadow="sm"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      overflow="hidden"
      maxH={["165px", "132px", "198px", "198px"]}
    >
      {children}
    </Stack>
  );
};

export default StoryWrapper;
