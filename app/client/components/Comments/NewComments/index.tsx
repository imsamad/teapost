import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { addCommentApi } from '@lib/api/commentApi';
import { CombineComment } from '@lib/types/CommentTypes';
import CommentForm from '../CommentForm';

import Primary from '../Primaries/Primary';

const NewComment = ({
  storyId,
  decrementComment,
  incremetComment,
}: {
  storyId: string;
  decrementComment: () => void;
  incremetComment: () => void;
}) => {
  const [comments, setComments] = useState<CombineComment[]>([]);

  const handleSubmit = async (text: string) => {
    addCommentApi(storyId, text).then(({ comment }) => {
      setComments((pre) => [comment, ...pre]);
      incremetComment();
    });
  };

  useEffect(() => {
    // return () => {
    //   setComments([]);
    // };
  }, []);
  return (
    <Box my={4}>
      <CommentForm
        type="add"
        placeholer="Add comment"
        onSubmitCB={handleSubmit}
        showAvatar
      />
      {comments.map((comment) => (
        <Primary
          key={comment._id}
          comment={comment}
          decrementComment={decrementComment}
          incremetComment={incremetComment}
        />
      ))}
    </Box>
  );
};

export default NewComment;
