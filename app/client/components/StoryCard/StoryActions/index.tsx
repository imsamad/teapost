import { Button, ButtonGroup } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { BiLike, BiDislike } from 'react-icons/bi';
const onClick = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
};
const Index = ({ storyId }: { storyId: string }) => {
  return (
    <ButtonGroup spacing="2">
      <Button
        leftIcon={<BiLike />}
        size="xs"
        fontSize="10px"
        variant="solid"
        onClick={onClick}
      >
        5
      </Button>
      <Button
        onClick={onClick}
        leftIcon={<BiDislike />}
        size="xs"
        fontSize="10px"
        variant="solid"
      >
        5
      </Button>
      <Button
        onClick={onClick}
        leftIcon={<ChatIcon />}
        size="xs"
        fontSize="10px"
        variant="solid"
      >
        5
      </Button>
    </ButtonGroup>
  );
};

export default Index;
