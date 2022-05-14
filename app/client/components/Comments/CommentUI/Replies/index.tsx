import { ButtonGroup } from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';

const Replies = ({ noOfReplies }: { noOfReplies: number }) => {
  return (
    <ButtonGroup>
      <TSButton
        // border="1px"
        justifySelf="flex-start"
        alignSelf="flex-start"
        size="xs"
        variant="outline"
        colorScheme="blue"
        outline="none"
        border="0px"
        _focus={{
          outline: '1px',
        }}
        borderRadius="none"
        isFullWidth={false}
        onClick={() => {}}
      >
        {noOfReplies} Replies
      </TSButton>
      <TSButton
        // border="1px"
        justifySelf="flex-start"
        alignSelf="flex-start"
        size="xs"
        variant="outline"
        colorScheme="blue"
        outline="none"
        border="0px"
        _focus={{
          outline: '1px',
        }}
        borderRadius="none"
        isFullWidth={false}
        onClick={() => {}}
      >
        Reply
      </TSButton>
    </ButtonGroup>
  );
};

export default Replies;
