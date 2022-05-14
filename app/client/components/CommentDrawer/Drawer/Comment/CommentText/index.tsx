import { Box, Button, Collapse, Text } from '@chakra-ui/react';
import { useState } from 'react';
import TextTruncate from 'react-text-truncate';

const CommentText = ({ text, replyTo }: { text: string; replyTo: string }) => {
  const [line, setLine] = useState(4);
  const reply = () => (
    <Text fontSize="lg" colorScheme="blue">
      {replyTo}
    </Text>
  );
  return (
    <Box
      maxW="400px"
      mx="auto"
      textAlign="justify"
      fontSize="lg"
      color="rgb(3,3,3)"
      _dark={{
        color: '#ddd',
      }}
      fontWeight={500}
    >
      <Collapse in={true} animateOpacity>
        {/* <Text>
          <Text fontSize="lg" color="blue" as="span" mr="4px">
            {replyTo}
          </Text>
          {text}
        </Text> */}
        <Text fontSize="lg" color="blue" as="span" mr="4px">
          {replyTo}
        </Text>
        <TextTruncate
          line={line}
          element="span"
          text={text}
          textTruncateChild={
            <Button
              mr="0"
              as="span"
              alignSelf="flex-end"
              justifySelf="flex-end"
              variant="link"
              onClick={() => setLine(Infinity)}
              // border="1px"
            >
              Read More
            </Button>
          }
        />
        {line == Infinity && (
          <Button
            as="span"
            variant="link"
            onClick={() => setLine(4)}
            // border="1px"
          >
            Read Less
          </Button>
        )}
      </Collapse>
    </Box>
  );
};
export default CommentText;
