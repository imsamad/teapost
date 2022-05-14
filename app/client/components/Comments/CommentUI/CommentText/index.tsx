import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CommentForm from '@compo/Comments/CommentForm';
import { updateCommentApi } from '@lib/api/commentApi';
import { CombineComment } from '@lib/types/CommentTypes';
import { useState } from 'react';
import TextTruncate from 'react-text-truncate';

const CommentText = ({
  comment,
  isPrimary,
}: {
  comment: CombineComment;
  isPrimary: boolean;
}) => {
  const [text, setText] = useState(comment.text);
  const editComment = useDisclosure();
  const replyTo = comment?.secondaryUser
    ? '@' + comment.secondaryUser.username
    : '';
  const onSubmitCB = async (val: string) => {
    if (val != comment.text) {
      updateCommentApi({
        isPrimary,
        commentId: comment._id,
        text: val,
      }).then((res) => {
        setText(res.comment.text);
        editComment.onClose();
      });
    }
  };
  return (
    <Flex>
      <Box flex="1">
        {editComment.isOpen ? (
          <CommentForm
            type="edit"
            value={text}
            onSubmitCB={onSubmitCB}
            onCancel={() => {
              editComment.onClose();
            }}
          />
        ) : (
          <RenderText text={text} replyTo={replyTo} />
        )}
      </Box>
      <Box>
        <IconButton
          variant="ghost"
          icon={<EditIcon />}
          aria-label="ss"
          size="xs"
          onClick={() => {
            editComment.onToggle();
          }}
        />
      </Box>
    </Flex>
  );
};

const RenderText = ({ text, replyTo }: { text: string; replyTo: string }) => {
  const [line, setLine] = useState(4);
  return (
    <Box
      // maxW="200px"
      mx="auto"
      textAlign="justify"
      fontSize="lg"
      color="rgb(3,3,3)"
      _dark={{
        color: '#ddd',
      }}
      fontWeight={500}
      wordBreak="break-all"
    >
      <Collapse in={true} animateOpacity>
        {/* <Text>
      <Text fontSize="lg" color="blue" as="span" mr="4px">
        {replyTo}
      </Text>
      {text}
    </Text> */}
        <Text fontSize="lg" color="blue" as="span" mr="4px" noOfLines={2}>
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
