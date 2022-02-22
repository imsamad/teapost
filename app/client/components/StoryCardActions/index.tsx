import { Button, ButtonGroup } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { BiLike, BiDislike } from 'react-icons/bi';
const Index = () => {
  return (
    <ButtonGroup spacing="2" my="2">
      <Button leftIcon={<BiLike />} size="xs" fontSize="10px" variant="solid">
        5
      </Button>
      <Button
        leftIcon={<BiDislike />}
        size="xs"
        fontSize="10px"
        variant="solid"
      >
        5
      </Button>
      <Button leftIcon={<ChatIcon />} size="xs" fontSize="10px" variant="solid">
        5
      </Button>
    </ButtonGroup>
  );
};

export default Index;
