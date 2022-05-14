import CommentUI from '@compo/Comments/CommentUI';
import ReplyComment from '@compo/Comments/ReplyComment';
import { CombineComment } from '@lib/types/CommentTypes';
import React, { memo } from 'react';
import { Grid } from '@chakra-ui/react';
const Secondary = ({
  comment,
  decrementComment,
  onReplyCB,
  decrementReplies,
}: {
  comment: CombineComment;
  incremetComment: () => void;
  onReplyCB: (comment: CombineComment) => Promise<void>;
  decrementComment: () => void;
  decrementReplies: () => void;
}) => {
  return (
    <Grid templateColumns="min-content max-content">
      <CommentUI
        render={
          <ReplyComment
            onReplyCB={onReplyCB}
            isPrimary={false}
            commentId={comment._id}
          />
        }
        comment={comment}
        isPrimary={false}
        decrementComment={() => {
          decrementComment();
          decrementReplies();
        }}
      />
    </Grid>
  );
};

export default memo(Secondary);
