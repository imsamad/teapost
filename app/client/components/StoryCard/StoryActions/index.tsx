import { Button, ButtonGroup } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { BiLike, BiDislike } from 'react-icons/bi';
import useUICtx from '../../Context/useUICtx';
const onClick = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
};
const Index = ({ storyId }: { storyId: string }) => {
  const { login } = useUICtx();
  return (
    <ButtonGroup spacing="2">
      <Button
        leftIcon={<BiLike />}
        size="xs"
        fontSize="10px"
        variant="solid"
        onClick={() => {
          login.on();
        }}
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
