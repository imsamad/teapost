import { Avatar, Grid, GridItem, HStack } from '@chakra-ui/react';
import { useState } from 'react';

import { getCookies } from '@lib/cookies';
import { CombineComment } from '@lib/types/CommentTypes';
import { cloudinaryUrl } from '@lib/utils';
import EditDeleteBtn from './EditDeleteBtn';
import CommentText from './CommentText';
import LikeDislikeBtn from './LikeDislikeBtn';
import CommentMeta from './Meta';

const CommentUI = ({
  comment: commentProp,
  decrementComment,
  isPrimary,
  render,
}: {
  comment: CombineComment;
  isPrimary: boolean;
  decrementComment: () => void;
  render?: any;
}) => {
  const [comment, setComment] = useState(commentProp);
  const userId = getCookies()?.user?._id;
  const isAuthor = userId == comment?.user?._id;

  return (
    <>
      {comment && (
        <>
          <GridItem>
            <Avatar
              alignSelf="flex-start"
              name={comment.user.fullName}
              src={cloudinaryUrl({
                src: comment.user.profilePic,
                width: 20,
                height: 20,
              })}
              size="sm"
            />
          </GridItem>
          <GridItem px={2} pb={2}>
            <HStack border="0px">
              <CommentMeta
                username={comment.user.username}
                createdAt={comment.createdAt}
                updatedAt={comment.updatedAt}
              />
              {isAuthor && (
                <EditDeleteBtn
                  onDeleteCB={() => {
                    decrementComment();
                    // @ts-ignore
                    setComment(null);
                  }}
                  isPrimary={isPrimary}
                  commentId={comment._id}
                />
              )}
            </HStack>

            <CommentText comment={comment} isPrimary={isPrimary} />
            <Grid templateColumns="min-content min-content  100%">
              <LikeDislikeBtn comment={comment} isPrimary={isPrimary} />
              {render}
            </Grid>
          </GridItem>
        </>
      )}
    </>
  );
};

export default CommentUI;
