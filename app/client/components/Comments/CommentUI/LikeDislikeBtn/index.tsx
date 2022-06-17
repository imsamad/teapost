import { GridItem } from '@chakra-ui/react';
import { useAuthCtx } from '@compo/Context';
import TSButton from '@compo/UI/TSButton';
import { likeOrDislikeCommentApi } from '@lib/api/commentApi';

import { CombineComment } from '@lib/types/CommentTypes';
import { useState } from 'react';

import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';

const LikeDislike = ({
  comment,
  isPrimary,
}: {
  comment: CombineComment;
  isPrimary: boolean;
}) => {
  const { auth, openLoginToast } = useAuthCtx();

  const [state, setState] = useState({
    noOfDislikes: comment.noOfDislikes,
    noOfLikes: comment.noOfLikes,
    hasBeenLike:
      auth?.user?._id && comment.noOfLikes
        ? !!comment.meta?.likedBy.includes(auth?.user?._id)
        : false,
    hasBeenDisLike:
      auth?.user?._id && comment.noOfDislikes
        ? !!comment.meta?.dislikedBy.includes(auth?.user?._id)
        : false,
  });

  const handleLikeOrDislike = (isLike: boolean) => {
    if (!auth?.user?._id) {
      openLoginToast();
      return;
    }
    const isUndo = isLike ? state.hasBeenLike : state.hasBeenDisLike;
    likeOrDislikeCommentApi({
      isPrimary,
      isLike,
      commentId: comment._id,
      undo: isUndo,
    }).then((res) => {
      setState({
        noOfLikes: res.comment.noOfLikes,
        noOfDislikes: res.comment.noOfDislikes,
        hasBeenLike: res.comment.noOfLikes > state.noOfLikes ? true : false,
        hasBeenDisLike:
          res.comment.noOfDislikes > state.noOfDislikes ? true : false,
      });
    });
  };

  return (
    <>
      <GridItem>
        <TSButton
          leftIcon={state.hasBeenLike ? <AiFillLike /> : <AiOutlineLike />}
          size="xs"
          variant="outline"
          colorScheme="blue"
          outline="none"
          border="none"
          _focus={{
            outline: 'none',
            border: 'none',
          }}
          onClick={() => handleLikeOrDislike(true)}
        >
          {state.noOfLikes}
        </TSButton>
      </GridItem>
      <GridItem>
        <TSButton
          leftIcon={
            state.hasBeenDisLike ? <AiFillDislike /> : <AiOutlineDislike />
          }
          size="xs"
          variant="outline"
          colorScheme="blue"
          outline="none"
          border="none"
          _focus={{
            outline: 'none',
            border: 'none',
          }}
          onClick={() => handleLikeOrDislike(false)}
        >
          {state.noOfDislikes}
        </TSButton>{' '}
      </GridItem>
    </>
  );
};

export default LikeDislike;
