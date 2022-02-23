import { Stack } from '@chakra-ui/react';

const StoryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      my={4}
      p="8px"
      shadow="md"
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      overflow="hidden"
      h={['155px', '132px', '190px', '186px']}
    >
      {children}
    </Stack>
  );
};

export default StoryWrapper;
