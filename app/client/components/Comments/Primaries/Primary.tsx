import { Box, Collapse, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import TSButton from '@compo/UI/TSButton';
import { CombineComment } from '@lib/types/CommentTypes';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSWRConfig } from 'swr';
import CommentUI from '../CommentUI';
import ReplyComment from '../ReplyComment';
import Secondaries from './Secondaries';
import Secondary from './Secondaries/Secondary';

const Primary = ({
  comment: commentProp,
  incremetComment,
  decrementComment,
}: {
  comment: CombineComment;
  incremetComment: () => void;
  decrementComment: () => void;
}) => {
  const [noOfReplies, setNoOfReplies] = useState(commentProp.noOfReplies || 0);

  const [newComment, setNewComment] = useState<CombineComment[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const comment = useMemo(() => commentProp, []);

  const showReplies = useDisclosure();
  const { mutate } = useSWRConfig();
  const onReplyCB = async (comment: CombineComment) => {
    // if (comment.secondaryUser) {
    await mutate(`/comments/secondaries/${commentProp._id}`);
    // setNewComment([]);
    !showReplies.isOpen && showReplies.onOpen();
    setNoOfReplies((pre) => pre + 1);

    return;
    // }
    setNewComment((pre) => [...pre, comment]);
    incremetComment();
    setNoOfReplies((pre) => pre + 1);
  };

  useEffect(() => {
    return () => {
      setNewComment([]);
    };
  }, []);
  const decrementReplies = useCallback(
    () => setNoOfReplies((pre) => pre - 1),
    []
  );
  return (
    <Grid templateColumns="min-content max-content">
      <CommentUI
        comment={comment}
        isPrimary
        decrementComment={decrementComment}
        render={
          <ReplyComment
            onReplyCB={onReplyCB}
            isPrimary={true}
            commentId={comment._id}
          />
        }
      />
      <GridItem colStart={2}>
        {noOfReplies ? (
          <TSButton
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
            onClick={() => showReplies.onToggle()}
          >
            {showReplies.isOpen ? 'Hide' : 'Show'} {noOfReplies} Replies
          </TSButton>
        ) : null}
        <Collapse in={showReplies.isOpen}>
          <Box py={2}>
            {showReplies.isOpen && (
              <Secondaries
                decrementReplies={decrementReplies}
                onReplyCB={onReplyCB}
                commentId={comment._id}
                decrementComment={decrementComment}
                incremetComment={incremetComment}
              />
            )}
          </Box>
        </Collapse>
        {/* <Collapse in={!!newComment.length}>
          {newComment.map((comment) => (
            <Secondary
              decrementReplies={decrementReplies}
              onReplyCB={onReplyCB}
              key={comment._id}
              comment={comment}
              incremetComment={incremetComment}
              decrementComment={decrementComment}
            />
          ))}
        </Collapse> */}
      </GridItem>
    </Grid>
  );
};

export default Primary;
