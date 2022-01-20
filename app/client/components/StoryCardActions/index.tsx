import { Button, ButtonGroup } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { BiLike, BiDislike } from 'react-icons/bi';
const Index = () => {
  return (
    <ButtonGroup spacing="2" my="2">
      <Button leftIcon={<ChatIcon />} size="xs" variant="solid">
        5
      </Button>
      <Button leftIcon={<BiLike />} size="xs" variant="solid">
        5
      </Button>
      <Button leftIcon={<BiDislike />} size="xs" variant="solid">
        5
      </Button>
    </ButtonGroup>
  );
};

export default Index;
