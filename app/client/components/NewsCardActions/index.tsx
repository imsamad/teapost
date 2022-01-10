import { Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';

const Index = () => {
  let colorScheme: string | { colorScheme: string } = useColorModeValue(
    'black',
    'blue'
  );
  colorScheme = { colorScheme: colorScheme };
  return (
    <Flex pt="2">
      <IconButton
        variant="outline"
        aria-label="Upvote x article"
        icon={<ChatIcon />}
        size="xs"
        {...colorScheme}
      />
      <IconButton
        mx="2"
        variant="outline"
        aria-label="Comment on x articles"
        icon={<ChatIcon />}
        size="xs"
        {...colorScheme}
      />
      <IconButton
        variant="outline"
        aria-label="Notify me of this articles author activity."
        icon={<ChatIcon />}
        size="xs"
        {...colorScheme}
      />
    </Flex>
  );
};

export default Index;
